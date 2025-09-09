import Header from '@/app/_components/header';
import Footer from '@/app/_components/footer';
import type { Metadata } from 'next';
import '@/app/globals.css';
import { Suspense } from 'react';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Leekir Blog',
  description: 'Your travel companion',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="./assets/favicon.ico" />
        <meta name="theme-color" content="#f68a1e" />
      </head>
      <body className={inter.className}>
        <Suspense>
          <Header />
        </Suspense>
        <div className="contents min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
