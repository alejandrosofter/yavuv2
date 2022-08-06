module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    URL_EJECUTA_BOOTWEB: process.env.URL_EJECUTA_BOOTWEB,
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
    URL_FUNCTIONS: process.env.URL_FUNCTIONS,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};
