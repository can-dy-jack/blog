/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig;

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})
const mdx = withMDX({
  // Append the default value with md extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  
})
module.exports = {
  ...mdx,
  basePath: "/blog",
  images: {
    unoptimized: true,
  },
};

// Error: Image Optimization using Next.js' default loader is not compatible with `next export`.
//   Possible solutions:
//     - Use `next start` to run a server, which includes the Image Optimization API.
//     - Configure `images.unoptimized = true` in `next.config.js` to disable the Image Optimization API.