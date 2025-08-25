// pages/kodiPage.js
import { styled } from "styled-components";
import Header from "@/components/Header/Header";
import { StyledMain, StyledMainContainer } from "@/components/StyledIndex";
import {
  StyledKodiList,
  StyledImageLink,
  StyledCertificateImage,
} from "@/components/Kodi/StyledKodiItem";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const StyledCategoryGrid = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

export const StyledTitlePegeKodi = styled.h1`
  margin-bottom: 20px;
  font-size: 36px;
`;

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
  const { default: kodi } = await import("@/lib/kodiNailsList");

  return {
    props: {
      kodi,
      ...(await serverSideTranslations(locale, [
        "common",
        "categoriesBeauty",
        "categoriesNails",
        "kodiNailsCollections",
      ])),
    },
  };
}
