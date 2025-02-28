import { notFound } from 'next/navigation';
import { getPostData, getAllPosts } from '@/lib/posts';
import type { Metadata } from 'next';
import { ReadingProgress } from '@/app/_components/ReadingProgress';
import SocialLinks from '@/app/_components/social-links';
import {
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
} from 'react-icons/fa';

const socialIcons: { [key: string]: React.ReactNode } = {
  instagram: <FaInstagram />,
  linkedin: <FaLinkedin />,
  whatsapp: <FaWhatsapp />,
  facebook: <FaFacebook />,
  twitter: <FaTwitter />,
};

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
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      url: 'blog.baha.co.in',
      title: post.title,
      description: post.excerpt,
      siteName: 'Baha Travels Blog',
      images: [{ url: post.image ?? '' }],
      publishedTime: post.date,
      authors: [post.author],
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
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
    <>
      <ReadingProgress />
      <article className="max-w-4xl mx-auto">
        <header className="py-12 px-4">
          <h1 className="text-5xl font-bold mb-4" itemProp="headline">
            {postData.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <address className="font-medium not-italic" itemProp="author">
              {postData.author}
            </address>
            <span>•</span>
            <time
              dateTime={postData.date}
              itemProp="datePublished"
              className="text-gray-600"
            >
              {postData.date}
            </time>
          </div>
          {postData.socialLinks && (
            <div className="flex items-center mt-4 -ms-5">
              {postData.socialLinks.map(
                (link: { name: string; url: string }, index: number) => {
                  const iconKey = link.name.toLowerCase();
                  return (
                    <SocialLinks
                      key={index}
                      href={link.url}
                      svg={socialIcons[iconKey] || null}
                      label={link.name}
                    />
                  );
                },
              )}
            </div>
          )}
        </header>
        <div
          className="prose prose-gray max-w-none px-4 pb-16 prose-img:mx-auto"
          itemProp="articleBody"
        >
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </article>
    </>
  );
}
