/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "strapi.cykreet.com",
          pathname: "/uploads/*",
        },
      ],
    },
  };
   
  module.exports = nextConfig;
   