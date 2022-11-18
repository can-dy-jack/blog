import Layout from "../../component/layout";
import SEO from "../../component/SEO";
import { get_docs_info, get_doc_data } from "../../lib/getDoc";
import styles from "../../styles/docs.module.css";
import Link from "next/link";

function DocIndex({ data_asider, data }) {
  return (
    <Layout className="main">
      <SEO title="文章"></SEO>
      <div className={styles.article_box}>
        <aside className={styles.aside}>
          {data_asider.data.map((item) => {
            if (item.type == "file") {
              return (
                <Link
                  href={"/doc/" + (item.slug === '/' ? "" : item.slug)}
                  key={item.title}
                  className={[styles.aside_file, item.slug === '/' ? styles.active : ' '].join(" ")}
                >
                  {item.title}
                </Link>
              );
            } else {
              return (
                <div key={item.dir} className={styles.aside_dir}>
                  <div className={styles.aside_dir_head}>
                    <span>{item.dir}</span>
                    <svg
                      width="20px"
                      height="20px"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      color="#000000"
                    >
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  {item.files.map((f) => (
                    <Link
                      href={"/doc/" + item.dir + "/" + f.slug}
                      key={f.slug}
                      className={styles.aside_file}
                    >
                      {f.title}
                    </Link>
                  ))}
                </div>
              );
            }
          })}
        </aside>
        <section className={styles.article}>
          <h1>{data.title}</h1>
          <article className="md" dangerouslySetInnerHTML={{
            __html: data.contentHtml
          }}></article>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data_asider = await get_docs_info();
  const data = await get_doc_data(["/"]);
  return {
    props: {
      data_asider,
      data,
    },
  };
}

export default DocIndex;
