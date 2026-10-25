/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  serverExternalPackages: ["@react-pdf/renderer"],
  async redirects() {
    return [{ source: "/soluciones", destination: "/#soluciones", permanent: false }];
  },
};

export default nextConfig;
