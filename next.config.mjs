/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "apps-s3-prod.utkarshapp.com"],
    unoptimized: true,   // ✅ Static export ke liye disable optimization
  },
  // output: "export",
  distDir: "out",
  experimental: {
    // turbo: {}
  },
};

export default nextConfig;   // (agar .mjs use kar rahe ho)
