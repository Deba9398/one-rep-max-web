/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactCompiler: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@mantine/core',
      '@mantine/hooks',
      '@tabler/icons-react',
    ],
  },
};

module.exports = nextConfig;
