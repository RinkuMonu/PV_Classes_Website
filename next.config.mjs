/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    domains: ["localhost",'apps-s3-prod.utkarshapp.com'],
  },
experimental: {
    // turbo: {} - comment this out
  }
};

export default nextConfig;
