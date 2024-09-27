/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.imgur.com",
        protocol: "https",
      },
      {
        hostname: "i.scdn.co",
        protocol: "https",
      },
      {
        hostname: "platform-lookaside.fbsbx.com",
        protocol: "https",
      },
      {
        hostname: "thisis-images.spotifycdn.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
