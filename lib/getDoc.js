import fs from "fs"
import path from "path"
import matter from "gray-matter";

const docs_root_dir = path.join(process.cwd(), '/docs');

export async function get_docs_info() {
    const dirs_and_files = fs.readdirSync(docs_root_dir);
    let data = [];
    for(const node of dirs_and_files) {
        const state = fs.statSync(path.join(docs_root_dir, node));
        if(state.isDirectory()) {
            // 是文件夹
            data.push({
                type: "dir",
                "dir": node,
                "files": [],
            })
        }
        if(state.isFile()) {
            // 是文件
            data.push({
                type: "file",
                name: node,
            })
        }
    }
    for(const part of data) {
        if(part.type === "dir") {
            const docs = fs.readdirSync(
                path.join(docs_root_dir, part.dir)
            );
            part.files = docs.map(doc => {
                const file = fs.readFileSync(
                    path.join(docs_root_dir, part.dir, doc),
                    "utf8"
                );

                const front = file ? matter(file) : '';

                return {
                    name: doc,
                    ...front.data
                };
            })
        } else if(part.type === 'file') {
            const file = fs.readFileSync(
                path.join(docs_root_dir, part.name),
                "utf8"
            )
            const front = file ? matter(file) : '';
            // if(front.data)
            for(const item of Object.keys(front.data)) {
                part[item] = front.data[item];
            }
        }
    }
    return {
        data
    };
}

export function get_doc_paths() {
    const all_docs = fs.readdirSync(docs_root_dir);
    const data = [];
    all_docs.forEach(dir_file => {
        const state = fs.statSync(
            path.join(docs_root_dir, dir_file)
        );
        if(state.isFile()) {
            const file = fs.readFileSync(
                path.join(docs_root_dir, dir_file),
                "utf8"
            );
            const front = matter(file)
            // if(dir_file === 'index') {
            //     data.push({ params: "" })
            // }
            data.push({ 
                params: { 
                    slug: [''+ front.data.slug ]
                } 
            });
        } else if(state.isDirectory()) {
            const files_path = fs.readdirSync(
                path.join(docs_root_dir, dir_file)
            );
            files_path.forEach(p => {
                const file = fs.readFileSync(
                    path.join(docs_root_dir, dir_file, p),
                    "utf8"
                );
                const front = matter(file);
                data.push({ 
                    params: { 
                        slug: [''+ dir_file, ''+ front.data.slug]
                    } 
                });
            })
        }
    })
    return data;
}

