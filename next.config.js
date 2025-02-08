/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  experimental: {
    // These settings help with client-side rendering
    workerThreads: true,
    cpus: 1
  }
};

module.exports = nextConfig;
