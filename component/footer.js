import config from "../config";
import styles from "./style/footer.module.css";
import Link from "next/link";

function PostFooter() {
  return (
    <footer className={styles.footer}>
      <section className={styles.linkBox}>
        {config.footer.map((item) => {
          return (
            <div key={item.label} className={styles.links}>
                <div className={styles.linksHead}>{item.label}</div>
              {item.items.map((link, k) => (
                <span key={k} className={styles.linksItem}>
                  <Link href={link.link}>{link.label}</Link>
                </span>
              ))}
            </div>
          );
        })}
      </section>
      <p>
        Copyright © {new Date().getFullYear()}, <Link href="https://github.com/can-dy-jack">{config.author}</Link>  Inc. Built with
        Next.js.
      </p>
    </footer>
  );
}
export default PostFooter;
