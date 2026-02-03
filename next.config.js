/** @type {import('next').NextConfig} */
const nextConfig = {};

if (process.env.DOCKER_BUILD === 'true') {
  nextConfig.output = 'standalone';
}

module.exports = nextConfig;
