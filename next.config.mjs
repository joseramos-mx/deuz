/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@react-pdf/renderer"],
  async redirects() {
    return [{ source: "/soluciones", destination: "/#soluciones", permanent: false }];
  },
};

export default nextConfig;
