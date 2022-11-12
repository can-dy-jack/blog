import Head from 'next/head'
import Image from 'next/image'
import SEO from '../component/SEO'
import Layout from '../component/layout'

export default function Home() {
  return (
    <>
      <SEO title="主页" keywords={ ['主页', 'blog'] }></SEO>
      <Layout>
        <div>home</div>
      </Layout>
    </>
  )
}
