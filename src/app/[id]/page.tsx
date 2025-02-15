import { notFound } from 'next/navigation';
import { getPostData, getAllPosts } from '@/lib/posts';
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

export default async function Post(props: Params) {
  const params = await props.params;
  const postData = await getPostData(params.id);

  if (!postData) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <header className="py-12 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {postData.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium">{postData.author}</span>
          <span>•</span>
          <time dateTime={postData.date} className="text-gray-500">
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
      <article className="prose prose-gray max-w-none px-4 pb-16">
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
}
