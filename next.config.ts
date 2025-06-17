import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        // port: "",
        pathname: "**",
        // search: "",
      },
    ],
  },
};

export default withNextVideo(nextConfig);