import { useEffect, useRef, useState } from "react";
import styles from "./style/function.module.css";

function Functions({ cio }) {
  const [progress, updateProgress] = useState("0%");
  const [max, updateMax] = useState(100);
  const toTop = useRef();
  const dark = useRef();

  // 代码抽象
  const ToDark = () => {
    document.body.classList.add("dark");
    dark.current.style.display = "none";

    const html = document.documentElement;
    html.style.setProperty("color-scheme", "dark");
    html.style.backgroundColor = "#0d1117";
  };
  const ToLight = () => {
    document.body.classList.remove("dark");
    dark.current.style.display = "inline";

    const html = document.documentElement;
    html.style.setProperty("color-scheme", "light");
    html.style.backgroundColor = "#ffffff";
  };

  useEffect(() => {
    window.onscroll = () => {
      updateMax(
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight
      );
      let scroll = document.documentElement.scrollTop;
      updateProgress("" + Math.floor((scroll / max) * 100) + "%");
      // console.log(max, scroll/max*100, scroll)
      if (scroll <= 500) {
        toTop.current.classList.add("hidden");
      } else {
        toTop.current.classList.remove("hidden");
      }
    };
    window.onresize = () => {
      updateMax(
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight
      );
    };
  }, [max]);

  function change_mode() {
    if (document.body.classList.contains("dark")) ToLight();
    else ToDark();
  }

  // 启动时检测是否开启cookie
  // useEffect(() => {
  //   if (document.cookie.includes("dark:open")) {
  //     ToDark();
  //   } else if (document.cookie.includes("dark:close")) {
  //     ToLight();
  //   }
  // }, []);

  function cookie_change_mode(e) {
    // OK之后并没有写入cookie，在这里判断一下写入
    if (!document.cookie.match(/mode/g)) {
      if(document.body.classList.contains("dark")) document.cookie = "mode=dark";
      else document.cookie = "mode=light";
    }

    if (!document.cookie.match(/mode=dark/g)) {
      ToDark();
      document.cookie = "mode=dark";
    } else {
      ToLight();
      document.cookie = "mode=light";
    }
  }

  useEffect(() => {
    // 空格控制打开黑暗模式
    document.onkeydown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (cio) cookie_change_mode();
        else change_mode();
      }
    };
  }, []);

  return (
    <div className={styles.function_box}>
      <div
        ref={toTop}
        className={[styles.function_btns, "hidden"].join(" ")}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className={styles.function_part}>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 11l6-6 6 6M6 19l6-6 6 6"
              stroke="var(--font)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      </div>

      <div className={styles.function_btns}>
        <div className={styles.function_part}>
          <span>{progress}</span>
        </div>
      </div>
      <div
        className={styles.function_btns}
        onClick={cio ? cookie_change_mode : change_mode}
      >
        <div className={styles.function_part}>
          <svg
            ref={dark}
            width="24px"
            height="24px"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M12 18a6 6 0 100-12 6 6 0 000 12zM22 12h1M12 2V1M12 23v-1M20 20l-1-1M20 4l-1 1M4 20l1-1M4 4l1 1M1 12h1"
              stroke="var(--font)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>

          <svg
            width="24px"
            height="24px"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M3 11.507a9.493 9.493 0 0018 4.219c-8.507 0-12.726-4.22-12.726-12.726A9.494 9.494 0 003 11.507z"
              stroke="var(--font)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Functions;
