/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  images: {
    domains: ['lh3.googleusercontent.com']
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig