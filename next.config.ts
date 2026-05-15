import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "store.storeimages.cdn-apple.com",
      },
      {
        protocol: "https",
        hostname: "www.apple.com",
      },
      {
        protocol: "https",
        hostname: "image-us.samsung.com",
      },
      {
        protocol: "https",
        hostname: "images.samsung.com",
      },
      {
        protocol: "https",
        hostname: "p1-ofp.static.pub",
      },
      {
        protocol: "https",
        hostname: "p2-ofp.static.pub",
      },
      {
        protocol: "https",
        hostname: "res.garmin.com",
      },
      {
        protocol: "https",
        hostname: "i02.appmifile.com",
      },
      {
        protocol: "https",
        hostname: "skyworth-tv.oss-cn-shenzhen.aliyuncs.com",
      },
    ],
  },
};

export default nextConfig;
