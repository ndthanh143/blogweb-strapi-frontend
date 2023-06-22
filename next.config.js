const { i18n } = require('./next-i18next.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    loader: 'default',
    domains: ['res.cloudinary.com', '127.0.0.1'],
  },
};

module.exports = nextConfig;
