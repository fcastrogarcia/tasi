import { useEffect } from "react";
import "styles/index.scss";
import Head from "next/head";
import { StylesProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

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

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
