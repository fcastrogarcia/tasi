import "styles/index.scss";
import Head from "next/head";
import { StylesProvider } from "@material-ui/core/styles";

// import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>TASI</title>
      </Head>
      <StylesProvider injectFirst>
        <Component {...pageProps} />
      </StylesProvider>
    </>
  );
}

export default MyApp;
