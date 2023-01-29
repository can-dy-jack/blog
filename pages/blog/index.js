import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../component/layout';
import SEO from '../../component/SEO';
import { getSortedBlogsData } from '../../lib/getblog';
import s from '../../src/styles/blog.module.css';

function BlogIndex({ allBlogsData }) {
  return (
    <Layout>
      <SEO title="博客列表" keywords={['博客列表', 'blogs']} />
      <section className={s.head}>
        <Image
          src="/blog/svg/desk-illustration.svg"
          alt="blog-svg"
          height={400}
          width={500}
        />
        <h1>文章列表</h1>
      </section>
      <section className={s.bloglistbox}>
        <div className={s.bloglist}>
          {allBlogsData.map((blog) => (
            <div
              key={blog.title}
              className={s.blogitem}
              style={{
                '--bg': blog.img
                  ? `url(${blog.img})`
                  : 'url("/img/default4.jpg")',
              }}
            >
              <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allBlogsData = getSortedBlogsData();
  return {
    props: {
      allBlogsData,
    },
  };
}

export default BlogIndex;