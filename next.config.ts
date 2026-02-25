import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // andymedia.ro -> www.andymedia.ro
      {
        source: "/:path*",
        has: [{ type: "host", value: "andymedia.ro" }],
        destination: "https://www.andymedia.ro/:path*",
        permanent: true,
      },

      // andymedia-site.vercel.app -> www.andymedia.ro
      {
        source: "/:path*",
        has: [{ type: "host", value: "andymedia-site.vercel.app" }],
        destination: "https://www.andymedia.ro/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;