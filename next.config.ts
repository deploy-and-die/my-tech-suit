import type { NextConfig } from "next";

const isNetlifyBuild = process.env.NETLIFY === "true";

const nextConfig: NextConfig = {
  ...(isNetlifyBuild
    ? {
        output: "export" as const,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
