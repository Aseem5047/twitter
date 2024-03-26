/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'cdn.pixabay.com',
      'p16-amd-va.tiktokcdn.com',
      'image.shutterstock.com',
      'images.pexels.com',
      'cdn.sanity.io',
      'miro.medium.com',
      "cliply.co"
    ],
  },
};

module.exports = nextConfig;