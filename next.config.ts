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
      {
        protocol: "https",
        hostname: "assets.nintendo.com",
      },
      {
        protocol: "https",
        hostname: "clan.fastly.steamstatic.com",
      },
      {
        protocol: "https",
        hostname: "assets.xboxservices.com",
      },
      {
        protocol: "https",
        hostname: "images.cdn.us-central1.gcp.commercetools.com",
      },
      {
        protocol: "https",
        hostname: "images.contentstack.io",
      },
      {
        protocol: "https",
        hostname: "static.gopro.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
