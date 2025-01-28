'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';

export default function PostCard({ post }: { post: PostMetadata }) {
  return (
    <Link
      href={`/${post.id}`}
      className="group flex flex-col overflow-hidden rounded-lg
        bg-white
        border border-gray-200/80
        hover:border-gray-300
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]
        transition-all duration-300 ease-out
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
    >
      <div
        className="relative h-48 w-full overflow-hidden bg-gray-50"
        style={{
          background: !post.image
            ? `linear-gradient(70deg, rgba(253,251,251,0.9) 0%, rgba(253,251,251,0.6) 50%, transparent 100%), 
               linear-gradient(10deg, ${post.accentColors[0]}, ${post.accentColors[1]})`
            : `linear-gradient(10deg, ${post.accentColors[0]}, ${post.accentColors[1]})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {post.image && (
          <Image
            src={post.image}
            alt={post.title ?? 'Post image'}
            className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
            width={400}
            height={225}
            priority={false}
          />
        )}
      </div>
      <div className="flex flex-col flex-grow p-5">
        <h3 className="font-semibold text-[17px] leading-snug text-gray-900 line-clamp-2 mb-3">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 mt-auto font-medium">
          {post.author} • {post.date}
        </p>
      </div>
    </Link>
  );
}
