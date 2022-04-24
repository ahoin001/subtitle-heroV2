/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_API_URL: "https://subtitle-hero-backend.herokuapp.com/",
  },
};

module.exports = nextConfig;
