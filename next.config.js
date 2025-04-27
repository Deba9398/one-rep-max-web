/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  experimental: {
    reactCompiler: true,
    optimizeCss: true,
    optimizePackageImports: [
      '@mantine/core',
      '@mantine/hooks',
      '@tabler/icons-react',
    ],
  },
};

module.exports = nextConfig;
