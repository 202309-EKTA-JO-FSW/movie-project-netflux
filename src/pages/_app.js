import 'bootstrap/dist/css/bootstrap.min.css'; 
import "@/styles/Footer.css"; 
import Layout from "../pages/components/layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}