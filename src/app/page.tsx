import { getAllPosts } from '@/lib/posts';
import BlogList from '@/app/_components/BlogList';
import { Suspense } from 'react';
import PostCarousel from '@/app/_components/post-carousel';

export default function Page() {
  const posts = getAllPosts();

  return (
    <>
      <PostCarousel
        posts={posts.slice(0, 4)}
        style={{ height: '70vh', maxHeight: '800px' }}
      />
      <div className="p-3 max-w-7xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold">All blogs</h1>
        <Suspense>
          <BlogList posts={posts} />
        </Suspense>
      </div>
    </>
  );
}
