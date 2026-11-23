import type { NextConfig } from 'next';

// Static export for GitHub Pages: the site lives at https://<user>.github.io/nextjs-portfolio/
const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/nextjs-portfolio',
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true }, // we run `npm run lint` separately
};

export default nextConfig;
