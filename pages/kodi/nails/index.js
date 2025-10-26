// pages/kodi/nails/index.js
// import { styled } from "styled-components";
import Header from "@/components/Header/Header";
import { StyledMain, StyledMainContainer } from "@/components/StyledIndex";
import {
  StyledKodiListItems,
  StyledTitlePegeKodi,
  StyledKodiList,
  StyledImageLink,
  StyledCertificollectioneImage,
} from "@/components/Kodi/StyledKodiItem";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function KodiNailsPage({ kodi }) {
  const { t } = useTranslation(["categoriesNails", "common"]);

  return (
    <>
      <Header kodiPage />
      <StyledMain>
        <StyledMainContainer>
          <StyledTitlePegeKodi>Kodi — Nails</StyledTitlePegeKodi>
          <StyledKodiListItems>
            {kodi.map((cat) => {
              const href =
                cat.route && cat.route !== "#"
                  ? cat.route
                  : `/kodi/nails/${cat.id}`;
              const label = t(cat.nameKey, { ns: "categoriesNails" });
              return (
                <StyledKodiList key={cat.id}>
                  <StyledImageLink href={href} />
                  <div style={{ textAlign: "center" }}>{label}</div>
                </StyledKodiList>
              );
            })}
          </StyledKodiListItems>
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
        "kodi/categoriesNails",
      ])),
    },
  };
}
