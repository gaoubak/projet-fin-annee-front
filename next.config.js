/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "images.unsplash.com",
    ],
  },
  env: {
    BACKEND_URL: "http://w2-groupe10.hetic-projects.arcplex.tech:8090",
  },
  crossOrigin: 'anonymous',
};

module.exports = nextConfig;
