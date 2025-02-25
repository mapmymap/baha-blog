import { getAllPosts } from '@/lib/posts';
import BlogList from '@/app/_components/BlogList';
import { Suspense } from 'react';
import PostCarousel from '@/app/_components/post_carousel';

export default function Page() {
  const posts = getAllPosts();

  return (
    <>
      <PostCarousel
        posts={posts.slice(0, 4)}
        style={{ height: '70svh', maxHeight: '800px' }}
      />
      <div className="p-3 max-w-7xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold">Recent blogs</h1>
        <Suspense>
          <BlogList posts={posts} />
        </Suspense>
      </div>
    </>
  );
}
