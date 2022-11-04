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
  images: {
    domains: [
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
        destination: 'https://server/:path*',
      },
    ];
  },
  webpack(config) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [...config.plugins];
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins,
    };
  },
};

module.exports = nextConfig;
