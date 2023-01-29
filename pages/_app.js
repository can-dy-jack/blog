import '../src/styles/animate.css';
import '../src/styles/global.css';
import '../src/styles/highlight.css';
import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Functions from '../component/functions';
import ConfirmPopup from '../component/cookie';

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
    if (document.cookie.includes('dark')) {
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
        classNames="fade"
        unmountOnExit
      >
        <ConfirmPopup func={() => set_temp(false)} setRight={setRight} />
      </CSSTransition>
    </>
  );
}

export default MyApp;
