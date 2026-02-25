import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "andymedia.ro" }],
        destination: "https://www.andymedia.ro/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;