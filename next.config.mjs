import RemarkMDX from '@next/mdx';
import emoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeMathjax from 'rehype-mathjax';
import rehypeStringify from 'rehype-stringify';
import { remarkCodeHike } from '@code-hike/mdx';
import fs from 'fs';

const text = fs.readFileSync('node_modules/shiki/themes/github-light.json', 'utf8');
const theme = JSON.parse(text);

const withMDX = RemarkMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      emoji,
      remarkGfm,
      remarkMath,
      [remarkCodeHike, { theme }],
      remarkRehype,
    ],
    rehypePlugins: [
      rehypeHighlight,
      rehypeMathjax,
      rehypeStringify,
    ],
  },
});
const mdx = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  ...mdx,
  basePath: '/blog',
  images: {
    unoptimized: true,
  },
};
export default nextConfig;