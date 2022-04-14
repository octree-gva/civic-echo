import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import DateAdapter from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import theme from "../theme";
import createEmotionCache from "../lib/createEmotionCache";
import { useHydrate, Provider } from "../stores/questions";
import useI18n from "../hooks/useI18n";
import "../styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { initialZustandState, lang, locales } = pageProps;
  const store = useHydrate(initialZustandState);
  useI18n({ locales, lang });

  return (
    <Provider createStore={() => store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <CssBaseline />
            <Component {...pageProps} />
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
};

export default MyApp;
