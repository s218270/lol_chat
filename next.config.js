/** @type {import('next').NextConfig} */
const nextConfig = {
    // webpack: (config) => {
    // config.resolve.fallback = { fs: false };

    //     return config;
    // },
    reactStrictMode: true,
    images: {
        domains: ['links.papareact.com']
    },
    experimental: {
        appDir: true
    }
}

module.exports = nextConfig
