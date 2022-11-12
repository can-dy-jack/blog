import config from "../config";
import Image from "next/image";
import Link from "next/link";
import styles from "./style/head.module.css"

function PostHead({}) {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">
                    <span>
                        <Image src="/logo.jpg" alt="logo"
                        height={40}
                        width={40} />
                    </span>
                    <span>{ config.title }</span>
                </Link>
            </div>
            <nav className={styles.links}>
                <Link href="/">主页</Link>
                <Link href="/">文章</Link>
                <Link href="/">博客</Link>
            </nav>
        </header>
    )
}
export default PostHead;