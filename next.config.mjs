/** @type {import('next').NextConfig} */
import RemarkMDX from "@next/mdx";
// glugins
import emoji from "remark-emoji"
import remarkGfm from 'remark-gfm';
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeMathjax from "rehype-mathjax";

const withMDX = RemarkMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkGfm,
      emoji,
      remarkMath,
    ],
    rehypePlugins: [
      rehypeHighlight,
      rehypeMathjax
    ],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})
const mdx = withMDX({
  // Append the default value with md extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  
})
export default {
  ...mdx,
  basePath: "/blog",
  reactStrictMode: true,
  images: {
    // 关闭图片优化， - 否则在GitHub上部署静态时会报错
    unoptimized: true,
  },
};
