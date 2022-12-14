import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import emoji from "remark-emoji";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import rehypeMathjax from "rehype-mathjax";
import moment from "moment";
moment.locale("zh-cn");

const blog_dir = path.join(process.cwd(), "/blog");
const all_blogs = fs.readdirSync(blog_dir);

export function getSortedBlogsData() {
  const blogs = all_blogs.map((blog) => {
    const file = fs.readFileSync(path.join(blog_dir, blog), "utf8");
    const front = matter(file);
    return {
      ...front.data,
    };
  });
  return blogs.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    else return 0;
  });
}
export function getAllBlogIds() {
  return all_blogs.map((blog) => {
    const file = fs.readFileSync(path.join(blog_dir, blog), "utf8");
    const front = matter(file);
    return {
      params: {
        slug: front.data.slug,
      },
    };
  });
}
export async function getBlogsData(slug) {
  let md;
  all_blogs.forEach((blog) => {
    const file = fs.readFileSync(path.join(blog_dir, blog), "utf8");
    const front = matter(file);
    if (front.data.slug === slug) {
      md = file;
    }
  });
  const front = matter(md);
  // use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(emoji, { padSpaceAfter: true, emoticon: true })
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeMathjax)
    .use(rehypeHighlight)
    .process(front.content);
  const contentHtml = processedContent.toString();

  let time;
  if (front.data.date) {
    time = moment(front.data.date).format("dddd, YYYY MMMM Do");
  }

  return {
    slug,
    ...front.data,
    time,
    contentHtml,
  };
}
