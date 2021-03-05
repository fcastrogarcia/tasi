import { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import theme from "styles/theme";
import "styles/index.scss";

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
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <Component {...pageProps} />
        </StylesProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
