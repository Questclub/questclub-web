import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permitir conexiones HMR desde IPs locales en dev (útil para probar
  // desde móvil u otra máquina en la misma red Wi-Fi).
  allowedDevOrigins: ["192.168.1.109", "192.168.1.0/24"],
};

export default nextConfig;
