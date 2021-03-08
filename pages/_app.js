import { useEffect } from "react";
import { SWRConfig } from "swr";
import axios from "axios";
import PropTypes from "prop-types";
import Head from "next/head";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import theme, { GlobalCss } from "styles/theme";
import "styles/index.scss";

const fetcher = (path, method) => {
  return axios({
    method,
    url: `/api${path}`,
  }).then(res => res.data);
};

function App({ Component, pageProps }) {
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
          <GlobalCss />
          <SWRConfig
            value={{
              fetcher,
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </StylesProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
