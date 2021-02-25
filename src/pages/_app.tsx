import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

import Layout from "@/src/components/Layout";
import Navbar from "@/src/components/Navbar";
import theme from "@/src/styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Head>
          <title>Home</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <Navbar />
        <CssBaseline />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
