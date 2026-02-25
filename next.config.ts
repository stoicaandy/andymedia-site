import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,

  async redirects() {
    return [
      // domenii -> www
      {
        source: "/:path*",
        has: [{ type: "host", value: "andymedia.ro" }],
        destination: "https://www.andymedia.ro/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "andymedia-site.vercel.app" }],
        destination: "https://www.andymedia.ro/:path*",
        permanent: true,
      },

      // trailing slash -> no slash (except root)
      {
        source: "/:path*/",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;