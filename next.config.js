/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sites packages the framework output from this conventional directory.
  distDir: 'dist',
};

if (process.env.DOCKER_BUILD === 'true') {
  nextConfig.output = 'standalone';
}

module.exports = nextConfig;
