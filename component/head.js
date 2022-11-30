import config from "../config";
import Image from "next/image";
import Link from "next/link";
import styles from "./style/head.module.css";
import { useEffect, useRef } from "react";

function PostHead() {
  const links = useRef();
  const more = useRef();

  useEffect(() => {
    more.current.onclick = () => {
      if(links.current.style.transform === "translateX(0px)") {
        links.current.style.transform = "translateX(100%)";
      } else {
        links.current.style.transform = "translateX(0)";
      }
    }
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <span>
            <Image
              src="/blog/logo.jpg"
              alt="logo"
              height={40}
              width={40}
              style={{
                borderRadius: "50%",
              }}
            />
          </span>
          <span>{config.title}</span>
        </Link>
      </div>
      <nav className={styles.links} ref={links}>
        <Link href="/">主页</Link>
        <Link href="/doc">文章</Link>
        <Link href="/blog">博客</Link>
        <Link href="/about">关于我</Link>
        <a
          href="https://github.com/can-dy-jack/blog"
          target="_blank"
          className={styles.github}
        ></a>
      </nav>
      <div className={styles.more} ref={more}>
        <span>
        <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--font)">
          <path d="M7 12.5a.5.5 0 100-1 .5.5 0 000 1zM12 12.5a.5.5 0 100-1 .5.5 0 000 1zM17 12.5a.5.5 0 100-1 .5.5 0 000 1z" fill="var(--font)" stroke="var(--font)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="var(--font)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        </span>
      </div>
    </header>
  );
}
export default PostHead;
