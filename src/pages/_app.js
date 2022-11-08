import "/styles/globals.css";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import koMsg from "src/lang/ko-KR.json";
import enMsg from "src/lang/en-US.json";
import createEmotionCache from "src/utility/createEmotionCache";
import { AuthProvider } from "src/contexts/jwt-context";

import AOS from "aos";
import "aos/dist/aos.css";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const router = useRouter();
  const { defaultLocale, locale } = useRouter();

  const messages = useMemo(() => {
    switch (locale) {
      case "ko":
        return koMsg;
      case "en":
        return enMsg;
      default:
        return koMsg;
    }
  }, [locale]);

  useEffect(() => {
    AOS.init();
  }, []);

  const storePathValues = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem("currentPath") || "/";
    storage.setItem("prevPath", prevPath);
    // Set the current path value by looking at the browser's location object.
    storage.setItem("currentPath", globalThis.location.pathname);
  };

  useEffect(() => {
    storePathValues();
  }, [router.asPath]);

  return (
    <CacheProvider value={emotionCache}>
      <IntlProvider
        locale={locale}
        messages={messages}
        defaultLocale={defaultLocale}
        onError={(err) => {
          return;
        }}
      >
        <AuthProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </AuthProvider>
      </IntlProvider>
    </CacheProvider>
  );
};

export default MyApp;
