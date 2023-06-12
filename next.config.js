/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
        enableUndici: true,
    },
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    api: {
        externalResolver: true,
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    },
}

module.exports = nextConfig
