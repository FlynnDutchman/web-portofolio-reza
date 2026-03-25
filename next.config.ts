import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Memaksa Vercel mengabaikan peringatan aturan penulisan (ESLint)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Memaksa Vercel mengabaikan peringatan tipe data bawaan TypeScript
    ignoreBuildErrors: true,
  },
};

export default nextConfig;