import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //(https://linked-posts.routemisr.com/uploads/default-profile.png)
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linked-posts.routemisr.com',
        pathname: '/uploads/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
