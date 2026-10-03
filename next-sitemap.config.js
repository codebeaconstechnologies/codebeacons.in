/** @type {import('next-sitemap').IConfig} */
const blogPosts = require('./src/data/blogs.json')

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://codebeacons.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: [
    '/opengraph-image',
    '/opengraph-image*',
    '/CBT-*',
    '/admin',
    '/admin/*',
    '/api/*',
  ],
  additionalPaths: async () => [
    ...['/', '/about', '/services', '/blog', '/contact'].map((loc) => ({ loc })),
    ...blogPosts.map((post) => ({
      loc: `/blog/${post.slug}`,
      lastmod: new Date(`${post.date}T00:00:00.000Z`).toISOString(),
    })),
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/CBT-*', '/admin', '/api'] },
    ],
  },
}
