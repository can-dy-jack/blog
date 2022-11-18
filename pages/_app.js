import '../styles/globals.css'
import "../styles/highlight.css"
import Functions from '../component/functions'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Functions />
    </>
  )
}

export default MyApp
