import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface PostMetadata {
  id: string;
  title?: string;
  date?: string;
  image?: string;
  accentColors: string[];
  [key: string]: any; // Allow additional metadata fields
}

export interface PostData {
  id: string;
  title?: string;
  date?: string;
  image?: string;
  accentColors: string[];
  contentHtml: string;
  [key: string]: any; // Allow additional metadata fields
}

const postsDirectory: string = path.join(process.cwd(), '/_posts');

function extractFirstImage(content: string): string | null {
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  const match = content.match(imageRegex);
  return match ? match[1] : null;
}

const natureGradients = [
  ['#a8e6cf', '#dcedc1'], // mint and sage
  ['#ffd3b6', '#ffaaa5'], // peach and coral
  ['#d4f0f0', '#8fcaca'], // soft blue and aqua
  ['#e8dff5', '#c3aed6'], // lavender and purple
  ['#ffdfd3', '#b5ead7'], // pink and seafoam
  ['#b5eead', '#d7f9d1'], // fresh green and lime
  ['#ffc8dd', '#ffafcc'], // rose and pink
  ['#bde0fe', '#a2d2ff'], // sky blue and azure
  ['#e9edc9', '#ccd5ae'], // sage and moss
];

const hashString = (str: string) => {
  let hash = 0;

  if (str.length)
    for (let i = 0; i < str.length; i++)
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0;

  return hash;
};

const getAccentColorsForTitle = (title: string) => {
  const hash = hashString(title);
  const index = hash % natureGradients.length;
  return natureGradients[index];
};

function getPostMetadata(id: string): {
  metadata: Record<string, string>;
  content: string;
} {
  const fileContents = fs.readFileSync(
    path.join(postsDirectory, `${id}.md`),
    'utf8',
  );
  const matterResult = matter(fileContents);
  const metadata = matterResult.data;

  if (!metadata.image) {
    const firstImage = extractFirstImage(matterResult.content);
    if (firstImage) metadata.image = firstImage;
  }

  return {
    metadata,
    content: matterResult.content,
  };
}

export function getAllPosts(): PostMetadata[] {
  const fileNames: string[] = fs.readdirSync(postsDirectory);
  const allPostsData: PostMetadata[] = fileNames.map((fileName) => {
    const id: string = fileName.replace(/\.md$/, '');
    const { metadata } = getPostMetadata(id);

    return {
      id,
      ...metadata,
      accentColors: getAccentColorsForTitle(metadata.title),
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    return (a.date ?? 0) < (b.date ?? 0) ? 1 : -1;
  });
}

export function getFeaturedPosts(): PostMetadata[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, 4);
}

export async function getPostData(id: any): Promise<any> {
  const { metadata, content } = getPostMetadata(id);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    ...metadata,
    accentColors: getAccentColorsForTitle(metadata.title),
    contentHtml,
  };
}
