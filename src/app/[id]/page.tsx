import { notFound } from 'next/navigation';
import { getPostData, getAllPosts } from '@/lib/posts';
import type { Metadata } from 'next';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  return await Promise.all(
    getAllPosts().map(async (x) => await getPostData(x.id)),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostData(id);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.contentHtml,
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      url: 'blog.baha.co.in',
      title: post.title,
      description: post.contentHtml,
      siteName: 'Baha Travels Blog',
      images: [{ url: post.image }],
      publishedTime: post.date,
      authors: [post.author],
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.contentHtml,
    },
  };
}

export default async function Post(props: Params) {
  const params = await props.params;
  const postData = await getPostData(params.id);

  if (!postData) {
    return notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="py-12 px-4">
        <h1
          className="text-4xl font-bold text-gray-900 mb-4"
          itemProp="headline"
        >
          {postData.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <address className="font-medium" itemProp="author">
            {postData.author}
          </address>
          <span>•</span>
          <time
            dateTime={postData.date}
            itemProp="datePublished"
            className="text-gray-500"
          >
            {postData.date}
          </time>
        </div>
      </header>
      <div
        className="prose prose-gray max-w-none px-4 pb-16"
        itemProp="articleBody"
      >
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </div>
    </article>
  );
}
