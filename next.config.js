/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  i18n: {
    locales: ["en", "ko"],
    defaultLocale: "ko",
    localeDetection: false,
  },
};

module.exports = nextConfig;
