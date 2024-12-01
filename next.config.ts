import type { NextConfig } from "next";
import { i18n } from "./next-i18next.config"; // Import the i18n configuration

const nextConfig: NextConfig = {
  i18n, // Add i18n to the Next.js config
  /* Other config options here */
};

export default nextConfig;
