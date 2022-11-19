import '../styles/globals.css'
import "../styles/highlight.css"
import Functions from '../component/functions'
import ConfirmPopup from "../component/cookie"
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [cookie_is_open, set_cooie_open] = useState(false);
  const [temp, set_temp] = useState(true);
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
  }, [])

  const temp_close_ConfirmPopup = () => {
    set_temp(false);
  }

  return (
    <>
      <Component {...pageProps} />
      <Functions cio={cookie_is_open} />

      {
        temp ? <ConfirmPopup func={temp_close_ConfirmPopup} setRight={ setRight }/> : null
      }
    </>
  )
}

export default MyApp
