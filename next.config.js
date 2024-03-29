/** @type {import('next').NextConfig} */
const nextConfig = {
    /* Fixing bug when avatar not loading */
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'referrer-policy', value: 'no-referrer' },
                ]
            }
        ]
    }
}

module.exports = nextConfig
