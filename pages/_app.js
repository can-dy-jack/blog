import '../styles/globals.css'
import "../styles/highlight.css"
import "../styles/animate.css"
import Functions from '../component/functions'
import ConfirmPopup from "../component/cookie"
import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group';

function MyApp({ Component, pageProps }) {
  const [cookie_is_open, set_cooie_open] = useState(false);
  const [temp, set_temp] = useState(false);
  const setRight = (open = true) => {
    if(open) {
      set_cooie_open(true)
    } else {
      set_cooie_open(false)
    }
    set_temp(false);
  }

  useEffect(() => {
    if(document.cookie.includes("dark")) {
      set_temp(false);
    }
    setTimeout(() => {
      set_temp(true);
    }, 1000);
  }, [])

  const temp_close_ConfirmPopup = () => {
    set_temp(false);
  }

  return (
    <>
      <Component {...pageProps} />
      <Functions cio={cookie_is_open} />

      <CSSTransition
        in={temp}
        timeout={500}
        classNames={'fade'}
        unmountOnExit={true}
      >
        <ConfirmPopup func={temp_close_ConfirmPopup} setRight={ setRight }/>
      </CSSTransition>
    </>
  )
}

export default MyApp
