import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/mbti2", // GitHub Pages 저장소 이름에 맞춘 기본 경로
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
