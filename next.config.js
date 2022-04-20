module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  env:{
    NEXTAUTH_URL:process.env.NEXTAUTH_URL,
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

  //   // This exists to keep the package size below the lambda 50mb zipped limit
  //   if (isServer) {
  //     if (!dev) {
  //       config.externals = ['chrome-aws-lambda'];
  //     }
  //   }

  //   return config;
  // },

}
