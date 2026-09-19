import GlobalStyle from "@/styles";

import { useState } from "react";

import UpdateOverlayHeight from "@/components/UpdateOverlayHeight";

import { useRouter } from "next/router";

import { appWithTranslation } from "next-i18next";

import nextI18NextConfig from "../next-i18next.config";

import { CartProvider } from "@/components/Cart/CartContext";

import { FavoritesProvider } from "@/components/Favorites/FavoritesContext";

import Header from "@/components/Header/Header";

function App({ Component, pageProps }) {
  const router = useRouter();

  const [selectedItemId, setSelectedItemId] = useState(null);

  const changeLanguage = (lng) => {
    router.push(router.asPath, undefined, { locale: lng });
  };

  return (
    <CartProvider>
      <FavoritesProvider>
        <UpdateOverlayHeight />

        <Header />

        <Component
          {...pageProps}
          selectedItemId={selectedItemId}
          changeLanguage={changeLanguage}
        />

        <GlobalStyle />
      </FavoritesProvider>
    </CartProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
