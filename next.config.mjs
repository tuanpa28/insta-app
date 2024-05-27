/** @type {import('next').NextConfig} */

const nextConfig = {
  // sassOptions: {
  //     includePaths: [path.join(__dirname, 'styles')],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
