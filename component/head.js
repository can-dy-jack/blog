import config from "../config";
import Image from "next/image";
import Link from "next/link";
import styles from "./style/head.module.css";
import { useEffect, useRef } from "react";
import HeadNav from "./_partial/headNav";
import useIsMobile from "./_partial/isMobile";

function PostHead() {
  const more = useRef(), bg = useRef(), 
    close = useRef(), aside = useRef();
  const isMobile = useIsMobile();

  const closeAside = () => {
    bg.current.style.opacity = "0";
    bg.current.style.visibility = "hidden";
    aside.current.style.transform = "translateX(100%)";
  }

  useEffect(() => {
    if(more.current && close.current && aside.current) {
      more.current.addEventListener("click", () => {
        bg.current.style.opacity = "1";
        bg.current.style.visibility = "visible";
        aside.current.style.transform = "translateX(0px)";
      })
      close.current.addEventListener("click", closeAside)
      bg.current.addEventListener("click", closeAside)
    }
  })

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
              className={styles.logo_img}
            />
          </span>
          <span>{config.title}</span>
        </Link>
      </div>
      <nav className={styles.nav}>
        {
          isMobile || (
            <div className={styles.navbar_inner}>
              <HeadNav styl={styles.github} />
            </div>
          )
        }
        {
          isMobile && <div ref={bg} className={styles.sidebar_backdrop} role="presentation"></div>
        }
        {
          isMobile && (
            <div className={styles.navbar_sidebar} ref={aside}>
              <div className={styles.aside_close} ref={close}>x</div>
              <HeadNav styl={styles.github} />
            </div>
          )
        }
      </nav>

      {
        isMobile && (
          <div className={styles.more} ref={more}>
            <span>
            <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--font)">
              <path d="M3 5h18M3 12h18M3 19h18" stroke="var(--font)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            </span>
          </div>
        )
      }
    </header>
  );
}
export default PostHead;
