import Head from "next/head";
import GlobalStyle from "@/styles";
import { useState, useEffect } from "react";
import projects from "@/lib/projectsData";
import UpdateOverlayHeight from "@/components/UpdateOverlayHeight";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config";

function App({ Component, pageProps }) {
  const router = useRouter();
  const { pathname, query, asPath } = router;

  const [showAboutMe, setShowAboutMe] = useState(false);
  const [projectItems, setProjectItems] = useState(projects);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const toggleCatalog = () => setIsCatalogOpen((s) => !s); // ADDED
  const closeCatalog = () => setIsCatalogOpen(false);

  useEffect(() => {
    const closeOnRoute = () => setIsCatalogOpen(false);
    router.events?.on("routeChangeStart", closeOnRoute);
    return () => router.events?.off("routeChangeStart", closeOnRoute);
  }, [router.events]);

  // Мова через i18n routing Next.js (push з { locale })
  const changeLanguage = (lng) => {
    router.push(router.pathname, router.asPath, { locale: lng });
  };

  // useEffect(() => {
  //   if (showAboutMe) {
  //     const aboutMeElement = document.getElementById("aboutMe");
  //     if (aboutMeElement) {
  //       aboutMeElement.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // }, [showAboutMe]);

  // function handleShowCatalogMenu() {
  //   setShowAboutMe(true);
  // }

  // useEffect(() => {
  //   if (showСatalogMenu) {
  //     const showСatalogMenuElement = document.getElementById("aboutMe");
  //     if (aboutMeElement) {
  //       showСatalogMenuElement.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // }, [showСatalogMenu]);

  // function handleShowCatalogMenu() {
  //   showСatalogMenu(true);
  // }

  return (
    <>
      <Head>
        <meta property="og:image" content="/logos/logo_social.jpg" />
      </Head>
      <UpdateOverlayHeight />

      <Component
        {...pageProps}
        // showAboutMe={showAboutMe}
        setShowAboutMe={setShowAboutMe}
        // handleShowText={handleShowText}
        projectItems={projectItems}
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
