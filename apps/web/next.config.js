const { withPlaiceholder } = require('@plaiceholder/next');
const withPWA = require('next-pwa')({
  dest: 'public',
  disableDevLogs: true,
  buildExcludes: [/app-build-manifest.json$/],
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
      pure: true,
      fileName: true,
    },
  },
  transpilePackages: [
    '@supercarmarket/ui',
    '@supercarmarket/features',
    '@supercarmarket/lib',
    '@supercarmarket/hooks',
  ],
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [767, 1199, 1200],
    imageSizes: [178, 285, 387],
    domains: [
      'doyup.shop',
      'www.polamfe.com',
      'user-images.githubusercontent.com',
      'supercarmarket-bucket.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  experimental: {
    esmExternals: false,
  },
  async rewrites() {
    return [
      {
        source: '/server/:path*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`,
      },
    ];
  },
  webpack(config, { dev, isServer }) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [...config.plugins];

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    if (!dev) config.devtool = isServer ? false : 'nosources-source-map';
    if (!isServer) config.resolve.fallback = { fs: false };

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      plugins,
    };
  },
};

const pwaConfig = withPWA(nextConfig);

module.exports = withPlaiceholder(pwaConfig);
