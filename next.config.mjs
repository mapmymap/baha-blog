/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['raw.githubusercontent.com'],
  },
  experimental: {
    // webpackMemoryOptimizations: true,
  },
};

export default nextConfig;
