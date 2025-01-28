'use client';

import { PostMetadata } from '@/lib/posts';
import BlogList from '@/app/_components/BlogList';
import { useSearchParams } from 'next/navigation';

export default function SearchResults({ posts }: { posts: PostMetadata[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(query.toLowerCase()),
  );

  return <BlogList posts={filteredPosts} />;
}
