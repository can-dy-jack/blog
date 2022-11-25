import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import emoji from "remark-emoji";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import rehypeMathjax from "rehype-mathjax";

const docs_root_dir = path.join(process.cwd(), "/docs");

/**
 *
 * @return 生成侧边栏数据
 */
export async function get_docs_info() {
  const dirs_and_files = fs.readdirSync(docs_root_dir);
  let data = [];
  for (const node of dirs_and_files) {
    const state = fs.statSync(path.join(docs_root_dir, node));
    if (state.isDirectory()) {
      // 是文件夹
      data.push({
        type: "dir",
        dir: node,
        files: [],
      });
    }
    if (state.isFile()) {
      // 是文件
      data.push({
        type: "file",
        name: node,
      });
    }
  }
  for (const part of data) {
    if (part.type === "dir") {
      const docs = fs.readdirSync(path.join(docs_root_dir, part.dir));
      const info = fs.readFileSync(
        path.join(docs_root_dir, part.dir, "__info__.json")
      );
      const infos = JSON.parse(info);
      part.position = infos.position ?? 1;
      part.files = [];
      for (const doc of docs) {
        if (doc === "__info__.json") continue;
        const file = fs.readFileSync(
          path.join(docs_root_dir, part.dir, doc),
          "utf8"
        );
        const front = matter(file);
        if (!front.position) front.position = 1;
        part.files.push({
          name: doc,
          ...front.data,
        });
      }
      part.files.sort(({ position: a }, { position: b }) => a - b);
    } else if (part.type === "file") {
      const file = fs.readFileSync(path.join(docs_root_dir, part.name), "utf8");
      const front = file ? matter(file) : "";
      for (const item of Object.keys(front.data)) {
        part[item] = front.data[item];
      }
    }
  }
  data.sort(({ position: a }, { position: b }) => a - b);
  return {
    data,
  };
}

/**
 *
 * @return JSON data of docs slug
 */
export function get_doc_paths() {
  const all_docs = fs.readdirSync(docs_root_dir);
  const data = [];
  all_docs.forEach((dir_file) => {
    const state = fs.statSync(path.join(docs_root_dir, dir_file));
    if (state.isFile()) {
      const file = fs.readFileSync(path.join(docs_root_dir, dir_file), "utf8");
      const front = matter(file);
      data.push({
        params: {
          slug: ["" + front.data.slug],
        },
      });
    } else if (state.isDirectory()) {
      const files_path = fs.readdirSync(path.join(docs_root_dir, dir_file));
      files_path.forEach((p) => {
        if (p !== "__info__.json") {
          const file = fs.readFileSync(
            path.join(docs_root_dir, dir_file, p),
            "utf8"
          );
          const front = matter(file);
          data.push({
            params: {
              slug: ["" + dir_file, "" + front.data.slug],
            },
          });
        }
      });
    }
  });
  return data;
}

/**
 *
 * @param {string[]} slug
 * @return {object}
 */
export async function get_doc_data(slug) {
  let front;
  if (slug.length === 1) {
    // file
    if (slug[0] === "/") {
      // index
      const file = fs.readFileSync(path.join(docs_root_dir, "index.md"));
      front = matter(file);
    } else {
      const file = fs.readFileSync(
        path.join(docs_root_dir, slug[0] + ".md"),
        "utf8"
      );
      front = matter(file);
    }
  } else if (slug.length === 2) {
    const files = fs.readdirSync(path.join(docs_root_dir, slug[0]));
    for (let i = 0; i < files.length; i++) {
      const f = fs.readFileSync(path.join(docs_root_dir, slug[0], files[i]));
      front = matter(f);
      if (front.data.slug === slug[1]) {
        break;
      }
    }
  } else {
    return {};
  }
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
  return {
    ...front.data,
    contentHtml,
    parent: slug[0]
  };
}
