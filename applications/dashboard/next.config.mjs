/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://boilerplate-api/api/v1/:path*'
      }
    ]
  },
};

export default nextConfig;
