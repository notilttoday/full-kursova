/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['./app', './components', './store']
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://boilerplate-api/api/v1/:path*'
      }
    ]
  },
  // reactStrictMode: true,
  // swcMinify: true,
  // webpack: (config, context) => {
  //   console.log("OLEG");
  //   if(process.env.NEXT_WEBPACK_USEPOLLING) {
  //     config.watchOptions = {
  //       poll: 500,
  //       aggregateTimeout: 300
  //     }
  //   }
  //   return config
  // },
};

console.log(process.env.NEXT_WEBPACK_USEPOLLING);

export default nextConfig;
