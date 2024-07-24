export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/components/"],
    },
    sitemap: "https://www.uniswaphooks.com/sitemap.xml",
  }
}
