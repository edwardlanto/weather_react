/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env:{
        OPEN_WEATHER_API: process.env.OPEN_WEATHER_API,
        GOOGLE_API: process.env.GOOGLE_API
    }
  }
  
  module.exports = nextConfig