import Layout from "../../component/layout"
import SEO from "../../component/SEO"
import { getAllBlogIds, getBlogsData, getSortedBlogsData } from "../../lib/getblog";
import styles from "../../styles/blogs.module.css";
import Link from "next/link";

function BlogPages({ data, allBlogs }) {
    return (
        <Layout className={styles.main}>
            <SEO title={data.title} keywords={["博客列表", data.slug, data.title]}></SEO>
            <aside className={styles.aside}>
                <h3>最近的博文</h3>
                <div className={styles.aside_blogs}>
                    {allBlogs.map(blog => (
                        <div key={blog.slug}  className={styles.blog}>
                            <Link href={blog.slug}>{blog.title}</Link>
                        </div>
                    ))}
                </div>
            </aside>
            <section className={styles.body}>
                <h1>{data.title}</h1>
                <article dangerouslySetInnerHTML={
                    { __html: data.contentHtml }
                }></article>
            </section>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllBlogIds();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const data = await getBlogsData(params.slug);
    // 前5个最近的文章
    const allBlogs = getSortedBlogsData().slice(0, 5);
    return {
        props: {
            data,
            allBlogs
        }
    }
}

export default BlogPages;
