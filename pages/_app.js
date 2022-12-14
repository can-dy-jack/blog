import "../styles/globals.css";
import "../styles/highlight.css";
import "../styles/animate.css";
import "../styles/media.css"; // 媒体查询 - 适配移动端
import Functions from "../component/functions";
import ConfirmPopup from "../component/cookie";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

function MyApp({ Component, pageProps }) {
  const [cookie_is_open, set_cooie_open] = useState(false);
  const [temp, set_temp] = useState(false);
  const setRight = (open = true) => {
    if (open) {
      set_cooie_open(true);
    } else {
      set_cooie_open(false);
    }
    set_temp(false);
  };

  useEffect(() => {
    if (document.cookie.includes("dark")) {
      set_temp(false);
      set_cooie_open(true);
    } else {
      setTimeout(() => {
        set_temp(true);
      }, 1000);
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <Functions cio={cookie_is_open} />

      <CSSTransition
        in={temp}
        timeout={500}
        classNames={"fade"}
        unmountOnExit={true}
      >
        <ConfirmPopup func={() => set_temp(false)} setRight={setRight} />
      </CSSTransition>
    </>
  );
}

export default MyApp;
