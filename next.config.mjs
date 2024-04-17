
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        nextScriptWorkers: true
    },
    compiler: {
        styledComponents: true,
    },
    images: {
        unoptimized: false,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "d32phrebrjmlad.cloudfront.net",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: 'http',
                hostname: '1.bp.blogspot.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '2.bp.blogspot.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '3.bp.blogspot.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '4.bp.blogspot.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '1.bp.blogspot.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '2.bp.blogspot.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '3.bp.blogspot.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '4.bp.blogspot.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
