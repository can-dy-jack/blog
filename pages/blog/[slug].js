import Layout from "../../component/layout"
import { getAllBlogIds, getBlogsData } from "../../lib/getblog";
import styles from "../../styles/blogs.module.css";

function BlogPages({ data }) {
    return (
        <Layout className={styles.main}>
            <aside className={styles.aside}>sidebar</aside>
            <section className={styles.body}>
                <h1>{data.title}</h1>
                {/* ... */}
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
    return {
        props: {
            data
        }
    }
}

export default BlogPages;