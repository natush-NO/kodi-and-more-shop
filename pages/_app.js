import Head from "next/head";
import GlobalStyle from "@/styles";
import { useState, useEffect } from "react";
import projects from "@/lib/projectsData";
import UpdateOverlayHeight from "@/components/UpdateOverlayHeight";

export default function App({ Component, pageProps }) {
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [projectItems, setProjectItems] = useState(projects);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    if (showAboutMe) {
      const aboutMeElement = document.getElementById("aboutMe");
      if (aboutMeElement) {
        aboutMeElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [showAboutMe]);

  function handleShowText() {
    setShowAboutMe(true);
  }

  return (
    <>
      <Head>
        <meta property="og:image" content="/logos/logo_social.jpg" />
      </Head>
      <GlobalStyle />
      <UpdateOverlayHeight />
      <Component
        {...pageProps}
        showAboutMe={showAboutMe}
        setShowAboutMe={setShowAboutMe}
        handleShowText={handleShowText}
        projectItems={projectItems}
        selectedItemId={selectedItemId}
      />
    </>
  );
}
