import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // C'est ici qu'on active le Français et l'Anglais
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  // Autorisation pour les images Unsplash
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;