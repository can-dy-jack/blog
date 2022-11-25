import { useRouter } from "next/router";
import Layout from "../../component/layout";
import SEO from "../../component/SEO";
import { get_doc_paths, get_docs_info, get_doc_data } from "../../lib/getDoc";
import styles from "../../styles/docs.module.css";
import Link from "next/link";
import { CSSTransition, SwitchTransition } from "react-transition-group";

function DOCPages({ data_asider, data }) {
  const router = useRouter();
  let pre = null,
    next = null;
  for (const asider of data_asider.data) {
    if (asider.type === "file" && asider.slug === data.slug) {
      break;
    } else if (asider.type === "dir") {
      const len = asider.files.length;
      for (let i = 0; i < len; i++) {
        const f = asider.files[i];
        if (f.slug === data.slug) {
          if (i > 0) {
            pre = asider.files[i - 1];
          }
          if (i < len - 1) {
            next = asider.files[i + 1];
          }
        }
      }
    }
  }

  return (
    <>
      <Layout>
        <SEO title={data.title} />

        <div className={styles.article_box}>
          <aside className={styles.aside}>
            {data_asider.data.map((item) => {
              if (item.type == "file") {
                return (
                  <Link
                    href={"/doc/" + (item.slug === "/" ? "" : item.slug)}
                    key={item.title}
                    className={[
                      styles.aside_file,
                      router.query.slug.join(",") === item.slug
                        ? styles.active
                        : "",
                    ].join(" ")}
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
                        color="var(--font)"
                      >
                        <path
                          d="M9 6l6 6-6 6"
                          stroke="var(--font)"
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
                        className={[
                          styles.aside_file,
                          router.query.slug.join(",") ===
                          item.dir + "," + f.slug
                            ? styles.active
                            : "",
                        ].join(" ")}
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
            <SwitchTransition>
              <CSSTransition
                timeout={300}
                classNames={"page1"}
                unmountOnExit
                key={"" + data.slug}
              >
                <div className={"page1"}>
                  <h1 className={styles.docs_title}>{data.title}</h1>
                  <article
                    className="md"
                    dangerouslySetInnerHTML={{
                      __html: data.contentHtml,
                    }}
                  ></article>
                </div>
              </CSSTransition>
            </SwitchTransition>

            <div className={styles.go_ahead}>
              <div className={styles.pre}>
                {pre && (
                  <Link href={"/doc/" + data.parent + "/" + pre.slug}>
                    <div className={styles.sup}>上一篇文章</div>
                    <div>{"<< " + pre.title}</div>
                  </Link>
                )}
              </div>
              <div className={styles.next}>
                {next && (
                  <Link href={"/doc/" + data.parent + "/" + next.slug}>
                    <div className={styles.sup}>下一篇文章</div>
                    <div>{next.title + " >>"}</div>
                  </Link>
                )}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await get_doc_paths();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data_asider = await get_docs_info();
  const data = await get_doc_data(params.slug);
  return {
    props: {
      data_asider,
      data,
    },
  };
}

export default DOCPages;
