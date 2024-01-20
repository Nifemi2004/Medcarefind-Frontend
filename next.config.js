/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/apps/mail',
                destination: '/apps/mail/inbox',
                permanent: true
            },
            {
                source: '/login',
                destination: '/auth/login',
                permanent: false
            },
            {
                source: '/signup',
                destination: '/auth/signup',
                permanent: false
            }
        ];
    }
};

module.exports = nextConfig;
