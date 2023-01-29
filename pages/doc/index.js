import React from 'react';
import Link from 'next/link';
import Layout from '../../component/layout';
import SEO from '../../component/SEO';
import { get_docs_info, get_doc_data } from '../../lib/getDoc';
import styles from '../../src/styles/docs.module.css';

function DocIndex({ posts, data }) {
  const list = [];
  posts.data.forEach((i) => {
    if (i.type === 'file') {
      list.push({
        slug: i.slug,
        title: i.title,
        root: '',
      });
    } else {
      Object.keys(i.files ?? {}).forEach((j) => {
        list.push({
          slug: i.files[j].slug,
          title: i.files[j].title,
          root: i.dir,
        });
      });
    }
  });

  return (
    <Layout className="main">
      <SEO title="文章" />
      <div className={styles.article_box}>
        <section className={styles.article}>
          <h1 className={styles.docs_title}>
            {data.title}
          </h1>
          <article
            className="md"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: data.contentHtml,
            }}
          />
          <div className={styles.index_posts_list}>
            {
              list.map((item) => (
                <Link className={styles.index_posts_item} key={item.title} href={`/doc/${item.root ? `${item.root}/` : ''}${item.slug}`}>
                  {item.title}
                  { item.root !== '' && <sup>{item.root}</sup>}
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
  const data = await get_doc_data(['/']);
  return {
    props: {
      posts,
      data,
    },
  };
}

export default DocIndex;
