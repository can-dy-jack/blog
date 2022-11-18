import Head from "next/head"
import PropTypes from 'prop-types';
import config from "../config";

export default function SEO({ title, description, keywords }) {
    return (
        <Head>
            <>
            <title>{ title + "-" + config.title }</title>
            <meta name="description" content={ description } />
            <meta name="keywords" content={keywords.join(",")} />
            <link rel="icon" href="/logo.jpg" />
            <meta property="og:type" content="blog" />
            <meta property="og:title" content={ title + '-' + config.title } />
            <meta property="og:description" content={ description } />
            <meta property="og:image" content="/logo.jpg" />
            <meta property="og:release_date" content={ new Date().toLocaleString() } />
            </>
        </Head>
    )
}
SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string)
}
SEO.defaultProps = {
    title: "陈科衡的博客",
    description: "陈科衡的博客",
    keywords: ['blog','kartjim']
}