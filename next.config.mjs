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
        ],
        domains: ['localhost', 'sdlc-scrapi.s3.us-east-1.amazonaws.com'],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack: false,
};

export default nextConfig;