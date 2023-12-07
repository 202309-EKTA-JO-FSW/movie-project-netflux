import "@/styles/index.css"
import Layout from "../pages/components/layout"

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
