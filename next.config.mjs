// // next.config.js / .mjs
// const nextConfig = {
//   images: { unoptimized: true }, // optional
// };
// export default nextConfig; // (ESM)  OR  module.exports = nextConfig; // (CJS)



//========================================================================================


// next.config.js

const nextConfig = {
  output: "export",   // 👈 ye line add karo
  images: {
    unoptimized: true,
  },
};

export default nextConfig;