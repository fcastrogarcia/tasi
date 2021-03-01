import "styles/overrides.scss";
import Head from "next/head";
// import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>TASI</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
