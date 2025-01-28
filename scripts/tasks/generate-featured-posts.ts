import fs from 'fs';
import path from 'path';
import { getFeaturedPosts } from '@/lib/posts';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

export default async function generateFeaturedPosts() {
  const featuredPosts = getFeaturedPosts();

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'featured-posts.json'),
    JSON.stringify(featuredPosts, null, 2),
  );
}
