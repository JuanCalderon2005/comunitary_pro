/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
      styledComponents: true,
  },
  reactStrictMode: true,
  images: {
      domains: ['community-volunteering.s3.amazonaws.com'],
  },
}

export default nextConfig;
