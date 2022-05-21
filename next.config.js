module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    URL_EJECUTA_BOOTWEB: process.env.URL_EJECUTA_BOOTWEB,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};
