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

  // useEffect(() => {
  //   if (showAboutMe) {
  //     const aboutMeElement = document.getElementById("aboutMe");
  //     if (aboutMeElement) {
  //       aboutMeElement.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // }, [showAboutMe]);

  // function handleShowText() {
  //   setShowAboutMe(true);
  // }
  const changeLanguage = (lng) => {
    router.push(router.pathname, router.asPath, { locale: lng });
  };

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
      />

      <GlobalStyle />
    </>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
