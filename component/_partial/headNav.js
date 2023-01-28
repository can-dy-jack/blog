import Link from 'next/link';

function HeadNav({ styl }) {
    return (
        <>
            <Link href="/doc">技术文章</Link>
            <Link href="/blog">我的博客</Link>
            <Link href="/clock">时钟</Link>
            <Link href="/about">关于我</Link>
            <a
            href="https://github.com/can-dy-jack/blog"
            target="_blank"
            className={styl}
            ></a>
        </>
    )
}

export default HeadNav;