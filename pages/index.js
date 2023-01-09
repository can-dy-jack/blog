import SEO from "../component/SEO";
import Layout from "../component/layout";
import config from "../config.js";
import styles from "../styles/Home.module.css";
import Index from "../file/index.mdx";
import Rbtn from "../stories/Rbtn";
import TipText from "../stories/TipText";
import Link from "next/link";
import FlexBox from "../component/_partial/FlexBox";
import { useEffect, useState } from "react";

export default function Home() {
  const [poem, setRandomPoem] = useState("");

  useEffect(() => {
    fetch("https://v1.hitokoto.cn/?c=k")
    .then(t => t.json())
    .then(
      data => setRandomPoem(data)
    )
    .catch(console.warn)
  }, [])

  return (
    <>
      <SEO title="主页" keywords={["主页", "blog"]}></SEO>
      <Layout>
        <section className={styles.head}>
          <h2 className={styles.title}>{config.title}</h2>
          <h3 className={styles.subtitle}>{config.description}</h3>
          <div className={styles.btn}>
            <Rbtn>
              <Link href="/blog">我的博客 {"->"}</Link>
            </Rbtn>
            <Rbtn>
              <Link href="/doc">我的文章📚</Link>
            </Rbtn>
          </div>
        </section>

        <div className={styles.mdx}>
            <p><TipText
            text={ poem.from_who ? poem.from_who : "佚名" }
            color="#ff2121"
            bg="#ff212121">
              { poem.hitokoto }
            </TipText></p>
        </div>

        <section className={styles.indexinfo}>
          <FlexBox
            imgAlt="info-1"
            imgLink="/blog/img/svg404/27.svg"
            title="前端相关知识"
            styles={styles}
          >
            这里是我的最新个人博客，我将在这里分享我在学习前端的过程中总结的知识和技能，分享给大家。
          </FlexBox>
          <FlexBox
            imgAlt="info-2"
            imgLink="/blog/img/svg404/33.svg"
            title="个人博客"
            styles={styles}
          >
            在这里，我也将总结我之前在其它平台发布的和以后将要发布的文章。
          </FlexBox>
          <FlexBox
            imgAlt="info-3"
            imgLink="/blog/img/svg404/32.svg"
            title="关于我"
            styles={styles}
          >
            本人是双非一本，在大学学习生活中逐渐接触到前端，并一直对前端抱有强烈的兴趣爱好，目前正在努力成为一名前端开发者！
          </FlexBox>
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
