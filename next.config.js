/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    reactStrictMode: true,
    swcMinify: true,
    images: {
        loader: "akamai",
        path: "",
    },
}

module.exports = nextConfig
