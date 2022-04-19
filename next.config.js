module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  env:{
    NEXTAUTH_URL:process.env.NEXTAUTH_URL,
  }

}
