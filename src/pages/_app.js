import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/../public/css/view.css'
import { Provider } from 'jotai';
import Banner from "../components/Banner"
import Navbar from "../components/Navbar"


export default function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Banner />
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}
