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
      part.files = docs.map((doc) => {
        const file = fs.readFileSync(
          path.join(docs_root_dir, part.dir, doc),
          "utf8"
        );
        const front = file ? matter(file) : "";
        return {
          name: doc,
          ...front.data,
        };
      });
    } else if (part.type === "file") {
      const file = fs.readFileSync(path.join(docs_root_dir, part.name), "utf8");
      const front = file ? matter(file) : "";
      for (const item of Object.keys(front.data)) {
        part[item] = front.data[item];
      }
    }
  }
  return {
    data,
  };
}

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
export async function get_doc_data( slug ) {
    if(slug.length === 1) {
        // file
        const file = fs.readFileSync(
            path.join(docs_root_dir, slug[0]+".md"),
            "utf8"
        );
        const front = matter(file);
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
            contentHtml
        }
    } else if(slug.length === 2) {
        const files = fs.readdirSync(
            path.join(docs_root_dir, slug[0])
        );
        let file, front;
        for(let i = 0;i<files.length;i++) {
            const f = fs.readFileSync(
                path.join(docs_root_dir, slug[0]+"/"+files[i])
            );
            front = matter(f);
            if(front.data.slug === slug[1]) {
                file = f;
                break;
            }
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
            contentHtml
        }
    } else {
        // index
        const file = fs.readFileSync(
            path.join(docs_root_dir, "index.md")
        );
        const front = matter(file);
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
            contentHtml
        }
    }
}

// let a = [
//   { params: { slug: ["about"] } },
//   { params: { slug: ["/"] } },
//   { params: { slug: ["javascript", "promis-a-plus"] } },
//   { params: {
//       slug: [
//         "javascript",
//         "several-recursive-methods-of-functional-programming",
//       ],},},
//   { params: { slug: ["leetcode", "775"] } },
//   { params: { slug: ["Rust", "rust-fibonacci"] } },
// ];
