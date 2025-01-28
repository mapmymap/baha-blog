'use client';

import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';
import PostCard from './PostCard';

export default function BlogList({ posts }: { posts: PostMetadata[] }) {
  return (
    <>
      {posts?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No posts found</p>
          <p className="mt-2 text-gray-500">
            Try adjusting your search or browse all our posts.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            View All Posts
          </Link>
        </div>
      )}
    </>
  );
}
