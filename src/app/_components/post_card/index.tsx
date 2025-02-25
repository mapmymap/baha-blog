'use client';

import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';

export default function PostCard({ post }: { post: PostMetadata }) {
  return (
    <Link href={`/${post.id}`} className="post-card">
      <div className="post-card-container">
        <div
          className="post-image-container"
          style={{
            background: `linear-gradient(10deg, ${post.accentColors[0]}, ${post.accentColors[1]})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          {post.image && (
            <Image
              src={post.image}
              alt={post.title ?? 'Post image'}
              className="post-image"
              width={400}
              height={225}
              priority={false}
            />
          )}
        </div>
        <div className="post-content">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-excerpt">{post.excerpt}</p>
          <p className="post-meta">
            {post.author} • {post.date}
          </p>
        </div>
      </div>
    </Link>
  );
}
