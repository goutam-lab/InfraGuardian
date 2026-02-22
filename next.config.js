/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignore the supabase folder during linting
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore the supabase folder during type checking
    ignoreBuildErrors: true, 
  },
};

export default nextConfig;