/** @type {import('next').NextConfig} */
const env = {
    server: process.env.API_URL
  }
  
  const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: env
  }

module.exports = nextConfig