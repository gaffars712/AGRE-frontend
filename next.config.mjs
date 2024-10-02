// /** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'sdlc-scrapi.s3.us-east-1.amazonaws.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'agre-pro.s3.me-central-1.amazonaws.com',
          port: '',
          pathname: '/**',
        },
      ],
      domains: [
          'sdlc-scrapi.s3.us-east-1.amazonaws.com',
          'agre-pro.s3.me-central-1.amazonaws.com'
      ],
  },
  sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: false,
};

export default nextConfig;