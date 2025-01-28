'use client';

import './style.css';
import { PostMetadata } from '@/lib/posts';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ClassNames from 'embla-carousel-class-names';
import Link from 'next/link';

export default function PostCarousel({
  posts,
  style,
}: {
  posts: PostMetadata[];
  style?: Record<string, string>;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: false },
    [Autoplay({ delay: 6000 }), ClassNames()],
  );

  const handleClick = (e: React.MouseEvent, index: number) => {
    if (!emblaApi) return;

    const selectedSlide = emblaApi.slideNodes()[index];
    if (!selectedSlide.classList.contains('is-snapped')) {
      e.preventDefault();
      emblaApi.scrollTo(index);
    }
  };

  return (
    <section className="embla" style={style} ref={emblaRef}>
      <div className="embla__container">
        {posts.map((post, index) => (
          <Link
            href={`./${post.id}`}
            key={post.id}
            className="embla__slide"
            onClick={(e) => handleClick(e, index)}
            style={{
              background: `
                linear-gradient(70deg, rgba(253,251,251,0.95) 0%, rgba(253,251,251,0.7) 45%, transparent 100%),
                url(${post.image}),
                linear-gradient(10deg, ${post.accentColors[0]}, ${post.accentColors[1]})`,
              backgroundPosition: post.image ? 'right' : 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="metadata">
              <span>
                {post.author} • {post.date}
              </span>
              <h2 className="text-4xl leading-tight sm:text-5xl font-bold">
                {post.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
