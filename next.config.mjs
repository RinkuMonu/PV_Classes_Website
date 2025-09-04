/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // ✅ static export ON
  images: { unoptimized: true } // ✅ image optimizer off (static hosting)
  // trailingSlash: true,       // (optional) enable if relative links break
  // basePath: '/PvClasses_Website',   // ❗ONLY if site subfolder me host hai
  // assetPrefix: '/PvClasses_Website/'// ❗ONLY if subfolder me host hai
};
module.exports = nextConfig;
