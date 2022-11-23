import Layout from "../../component/layout"
import SEO from "../../component/SEO"
import {
  getAllBlogIds,
  getBlogsData,
  getSortedBlogsData,
} from "../../lib/getblog"
import styles from "../../styles/blogs.module.css"
import Link from "next/link"

function BlogPages({ data, allBlogs }) {
  return (
    <>
      <SEO
        title={data.title}
        keywords={["博客列表", data.slug, data.title]}
      ></SEO>
      <Layout className={styles.main}>
        <section
          className={styles.article_info}
          style={{
            "--bg": data.img
              ? `url(${data.img})`
              : 'url("/blog/img/default.jpg")',
            "--h": `${data.imgHeight || "300px"}`,
            color: `${data.color || "inherit"}`,
          }}
        >
          <h1 className={styles.title}>{data.title}</h1>
          <p>{data.time}</p>
        </section>
        <section className={styles.article_box}>
          <article
            className="md"
            dangerouslySetInnerHTML={{ __html: data.contentHtml }}
          ></article>
        </section>

        <section className={styles.foot}>
          <aside className={styles.foot_box}>
            <h3>最近的博文</h3>
            <div className={styles.more_blog}>
              {allBlogs.map((blog) => (
                <div
                  key={blog.slug}
                  style={{
                    "--bg": blog.img
                      ? `url(${blog.img})`
                      : `url("/img/default4.jpg")`,
                  }}
                >
                  <Link href={blog.slug}>{blog.title}</Link>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllBlogIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getBlogsData(params.slug);
  // 前5个最近的文章
  const allBlogs = getSortedBlogsData().slice(0, 5);
  return {
    props: {
      data,
      allBlogs,
    },
  };
}

export default BlogPages;
