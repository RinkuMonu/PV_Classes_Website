/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "apps-s3-prod.utkarshapp.com"],
  },
  output: "export",   // ✅ Static export mode
  distDir: "out",     // ✅ Build files out folder me jayenge (default .next hota hai)
  experimental: {
    // turbo: {}  // comment hi rehne do
  },
};

module.exports = nextConfig;  // ⚠️ Next.js me CommonJS export use hota hai, "export default" hata do
