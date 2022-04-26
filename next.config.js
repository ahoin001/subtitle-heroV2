/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_API_URL: "https://subtitle-hero-backend.herokuapp.com/",
    CLOUDINARY_NAME: "damclaohv",
    CLOUDINARY_API_KEY: "357812489313368",
    CLOUDINARY_API_SECRET: "BN_PH_5aGxM9bI-eMB9HXHIxR10",
  },
};

module.exports = nextConfig;
