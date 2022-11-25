import Layout from "../../component/layout";
import SEO from "../../component/SEO";
import { get_docs_info, get_doc_data } from "../../lib/getDoc";
import styles from "../../styles/docs.module.css";
import Link from "next/link";

function DocIndex({ posts, data }) {
  const list = [];
  for(const i of posts.data) {
    if(i.slug === '/') continue;
    if(i.type === 'file') {
      list.push({
        slug: i.slug,
        title: i.title,
        root: ""
      })
    } else {
      for(const j of i.files) {
        list.push({
          slug: j.slug,
          title: j.title,
          root: i.dir
        })
      }
    }
  }

  return (
    <Layout className="main">
      <SEO title="文章"></SEO>
      <div className={styles.article_box}>
        <section className={styles.article}>
          <h1 className={styles.docs_title}>{data.title}</h1>
          <article
            className="md"
            dangerouslySetInnerHTML={{
              __html: data.contentHtml,
            }}
          ></article>
          <div className={styles.index_posts_list}>
            {
              list.map(item => (
                <Link className={styles.index_posts_item} key={item.slug} href={'/doc/' + (item.root ? item.root + '/' : '') + item.slug}>
                  {item.title}
                  { item.root !== "" && <sup>{item.root}</sup>}
                </Link>
              ))
            }
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await get_docs_info();
  const data = await get_doc_data(["/"]);
  return {
    props: {
      posts,
      data,
    },
  };
}

export default DocIndex;
