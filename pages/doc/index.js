import Layout from "../../component/layout"
import SEO from "../../component/SEO"
import { get_docs_info } from "../../lib/getDoc"
import styles from "../../styles/docs.module.css"
import Link from "next/link"

function DocIndex({ data_asider }) {
    return (
        <Layout className="main">
            <SEO title="文章"></SEO>
            <div className={styles.article_box}>
                <aside className={styles.aside}>
                    {data_asider.data.map(item => {
                        if(item.type == 'file') {
                            return <div key={item.name}>
                                <Link href={item.slug}>
                                {item.name}
                                </Link>
                            </div>
                        } else {
                            return <div key={item.name}>{item.dir}</div>
                        }
                    })}
                </aside>
                <article  className={styles.article}>
                    article
                    <pre>
                    {
                        JSON.stringify(data_asider, null, 4)
                    }
                    </pre>
                </article>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const data_asider = await get_docs_info();
    return {
        props: { 
            data_asider
        }
    }
}

export default DocIndex;