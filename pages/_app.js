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
        <meta
          property="og:title"
          content="Kodi and More — магазин професійної косметики в Ужгороді"
        />
        <meta
          property="og:description"
          content="Магазин Kodi and More, Ужгород. Професійні товари для бʼюті-майстрів — майстрів манікюру, педикюру, лешмейкерів, бровістів."
        />
        <meta
          property="og:image"
          content="https://kodi-and-more-shop.vercel.app/logos/logo_social.jpeg"
        />
        <meta
          property="og:url"
          content="https://kodi-and-more-shop.vercel.app/"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Kodi and More — магазин професійної косметики в Ужгороді"
        />
        <meta
          name="twitter:description"
          content="Магазин Kodi and More, Ужгород. Професійні товари для бʼюті-майстрів — майстрів манікюру, педикюру, лешмейкерів, бровістів."
        />
        <meta
          name="twitter:image"
          content="https://kodi-and-more-shop.vercel.app/logos/logo_social.jpeg"
        />
        <meta
          property="og:image:secure_url"
          content="https://kodi-and-more-shop.vercel.app/logos/logo_social.jpeg"
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Kodi and More" />
        <meta property="og:locale" content="uk_UA" />
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
