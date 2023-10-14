/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    reactStrictMode: true,
    swcMinify: true,
    images: {
        loader: "akamai",
        path: "",
    },
    publicRuntimeConfig: {
        next_public_subgraph_url: process.env.NEXT_PUBLIC_SUBGRAPH_URL,
    },
}

module.exports = nextConfig
