import Layout from "../../component/layout"
import { getSortedBlogsData } from "../../lib/getblog"
import Link from "next/link"

function BlogIndex({ allBlogsData }) {
    return (
        <Layout>
            <section>
                <div>
                    最近博客
                </div>
                <div>
                    {
                        allBlogsData.map(blog => (
                            <div key={blog.title}>
                                <Link href={"/blog/" + blog.slug}>{blog.title}</Link>
                            </div>
                        ))
                    }
                </div>
            </section>
        </Layout>
    )
}

export async function getStaticProps () {
    const allBlogsData = getSortedBlogsData();
    return {
        props: {
            allBlogsData
        }
    }
}

export default BlogIndex;