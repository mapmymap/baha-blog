import Header from './_components/header';
import Footer from '@/app/_components/footer';
import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Baha',
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
      <body>
        <Suspense>
          <Header />
        </Suspense>
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
