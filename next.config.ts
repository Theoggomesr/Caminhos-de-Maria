
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações das Server Actions
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },

  // Permite carregar imagens armazenadas no Supabase
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
