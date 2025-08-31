// pages/kodiPage.js
import Header from "@/components/Header/Header";
import { StyledMain, StyledMainContainer } from "@/components/StyledIndex";
import { StyledTitlePegeKodi } from "@/components/Kodi/StyledKodiItem";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function KodiPage() {
  const { t } = useTranslation(["categoriesNails", "common"]);

  return (
    <>
      <Header kodiPage />
      <StyledMain>
        <StyledMainContainer>
          <StyledTitlePegeKodi>Kodi</StyledTitlePegeKodi>
        </StyledMainContainer>
      </StyledMain>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const { default: kodi } = await import("@/lib/kodi/kodiNailsList");

  return {
    props: {
      kodi,
      ...(await serverSideTranslations(locale, [
        "common",
        "categoriesBeauty",
        "categoriesNails",
        "categoriesBeauty",
        "kodiNailsCollections",
      ])),
    },
  };
}
