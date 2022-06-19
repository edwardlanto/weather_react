/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env:{
        OPEN_WEATHER_API: process.env.OPEN_WEATHER_API,
    }
  }
  
  module.exports = nextConfig