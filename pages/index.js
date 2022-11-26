import Link from "next/dist/client/link";
import SEO from "../component/SEO";
import Layout from "../component/layout";
import config from "../config.js";
import styles from "../styles/Home.module.css";
import Index from "../file/index.mdx";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <SEO title="主页" keywords={["主页", "blog"]}></SEO>
      <Layout>
        <section className={styles.head}>
          <h2 className={styles.title}>{config.title}</h2>
          <h3 className={styles.subtitle}>{config.description}</h3>
          <div className={styles.btn}>
            <button>
              <Link href="/blog">我的博客 {"->"}</Link>
            </button>
            <button>
              <Link href="/doc">我的文章📚</Link>
            </button>
          </div>
        </section>

        <section className={styles.indexinfo}>
          <div className={styles.indexinfoitem}>
            <span>
              <Image
                src="/blog/img/svg404/27.svg"
                alt="info-1"
                height={300}
                width={300}
              />
            </span>
            <div className={styles.info_head}>前端相关知识</div>
            <p>
              这里是我的最新个人博客，我将在这里分享我在学习前端的过程中总结的知识和技能，分享给大家。
            </p>
          </div>
          <div className={styles.indexinfoitem}>
            <span>
              <Image
                src="/blog/img/svg404/33.svg"
                alt="info-1"
                height={300}
                width={300}
              />
            </span>
            <div className={styles.info_head}>个人博客</div>
            <p>在这里，我也将总结我之前在其它平台发布的和以后将要发布的文章</p>
          </div>
          <div className={styles.indexinfoitem}>
            <span>
              <Image
                src="/blog/img/svg404/32.svg"
                alt="info-1"
                height={300}
                width={300}
              />
            </span>
            <div className={styles.info_head}>关于我</div>
            <p>在这里，我也将总结我之前在其它平台发布的和以后将要发布的文章</p>
          </div>
        </section>

        <section className={styles.mdx}>
          <article className="md">
            <Index />
          </article>
        </section>
      </Layout>
    </>
  );
}
