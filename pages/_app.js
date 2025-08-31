import Head from "next/head";
import GlobalStyle from "@/styles";
import { useState, useEffect } from "react";
import UpdateOverlayHeight from "@/components/UpdateOverlayHeight";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config";

function App({ Component, pageProps }) {
  const router = useRouter();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const toggleCatalog = () => setIsCatalogOpen((s) => !s);
  const closeCatalog = () => setIsCatalogOpen(false);

  useEffect(() => {
    const closeOnRoute = () => setIsCatalogOpen(false);
    router.events?.on("routeChangeStart", closeOnRoute);
    return () => router.events?.off("routeChangeStart", closeOnRoute);
  }, [router.events]);

  const changeLanguage = (lng) => {
    router.push(router.asPath, undefined, { locale: lng });
  };

  return (
    <>
      <Head>
        <meta property="og:image" content="/logos/logo_social.jpg" />
      </Head>
      <UpdateOverlayHeight />

      <Component
        {...pageProps}
        selectedItemId={selectedItemId}
        changeLanguage={changeLanguage}
        isCatalogOpen={isCatalogOpen}
        setIsCatalogOpen={setIsCatalogOpen}
        toggleCatalog={toggleCatalog}
        closeCatalog={closeCatalog}
      />

      <GlobalStyle />
    </>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
