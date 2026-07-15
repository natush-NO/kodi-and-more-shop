// import Head from "next/head";?
import Header from "@/components/Header/Header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { StyledMain, StyledMainContainer } from "@/components/StyledIndex";
import { useState, useEffect } from "react";
import {
  StyledKodiListItems,
  StyledKodiList,
  StyledTitlePegeKodi,
  StyledImageLink,
  StyledCertificateImage,
} from "@/components/Kodi/StyledKodiItem";
import { kodiBasesList } from "@/lib/kodi/baseKodi/kodiBasesList";

export default function BasesIndex() {
  const { t, i18n } = useTranslation(["kodiBasesList", "common"]);

  const [shuffledCatalog, setShuffledCatalog] = useState([]);

  useEffect(() => {
    const shuffled = [...kodiBasesList].sort(() => Math.random() - 0.5);
    setShuffledCatalog(shuffled);
  }, [kodiBasesList]);

  return (
    <>
      <Header kodiPage />

      <StyledMain>
        <StyledMainContainer>
          <StyledTitlePegeKodi>{t("basesPageTitle")}</StyledTitlePegeKodi>
          <StyledKodiListItems>
            {shuffledCatalog.map((base) => (
              <StyledKodiList key={base.id}>
                <StyledImageLink href={base.route}>
                  <StyledCertificateImage
                    src={base.image}
                    alt={t(base.nameKey)}
                    fill
                  />
                </StyledImageLink>

                <div
                  style={{
                    marginTop: 12,
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: 600,
                  }}
                >
                  {t(base.nameKey)}
                </div>
              </StyledKodiList>
            ))}
          </StyledKodiListItems>
        </StyledMainContainer>
      </StyledMain>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "kodiBasesList",
        "categoriesBeauty",
        "brandsCatalog",
        "kodiNailsCollections",
      ])),
    },
  };
}
