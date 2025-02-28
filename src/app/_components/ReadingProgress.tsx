'use client';

import { useEffect, useState } from 'react';

export const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const docHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;
      const position = window.scrollY;

      const percentComplete = (position / (docHeight - viewHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, percentComplete)));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-[var(--header-height)] left-0 w-full h-1">
      <div
        className="h-full bg-brand transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
