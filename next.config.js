/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGODB_URI: "mongodb+srv://nathantest:nathantest@dynamicsnippets.zjcalkt.mongodb.net/?retryWrites=true&w=majority",
    MONGODB_DB: "DynamicSnippets",
    JWT_SECRET: process.env.JWT_SECRET,
  }
}

module.exports = nextConfig
