import Layout from "../../component/layout";
import SEO from "../../component/SEO";
import { get_docs_info } from "../../lib/getDoc";
import styles from "../../styles/docs.module.css";
import Link from "next/link";

function DocIndex({ data_asider }) {
  return (
    <Layout className="main">
      <SEO title="文章"></SEO>
      <div className={styles.article_box}>
        <aside className={styles.aside}>
          {data_asider.data.map((item) => {
            if (item.type == "file") {
              return (
                <Link
                  href={"/doc/" + item.slug}
                  key={item.name}
                  className={[styles.aside_file, item.slug === '/' ? styles.active : ' '].join(" ")}
                >
                  {item.title}
                </Link>
              );
            } else {
              return (
                <div key={item.name} className={styles.aside_dir}>
                  <div className={styles.aside_dir_head}>
                    <span>{item.dir}</span>
                    <svg
                      width="20px"
                      height="20px"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      color="#000000"
                    >
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
        <article className={styles.article}>
          article
          <pre>{JSON.stringify(data_asider, null, 4)}</pre>
        </article>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data_asider = await get_docs_info();
  return {
    props: {
      data_asider,
    },
  };
}

export default DocIndex;
