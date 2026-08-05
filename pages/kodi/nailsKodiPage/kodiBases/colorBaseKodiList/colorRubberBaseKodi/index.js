import Header from "@/components/Header/Header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { StyledMain, StyledMainContainer } from "@/components/StyledIndex";

import {
  StyledKodiListItems,
  StyledKodiList,
  StyledTitlePegeKodi,
  StyledCardLink,
  StyledImageWrapper,
  StyledCertificateImage,
  StyledCardTitle,
} from "@/components/Kodi/StyledCartItem";

import colorRubberBaseKodi from "@/lib/kodi/nailsKodiPage/baseKodiList/colorBaseCollectionsKodi/colorRubberBase/iIndex";

export default function BasesIndex() {
  const { t } = useTranslation(["colorRubberBaseKodi", "common"]);

  return (
    <>
      <Header kodiPage />

      <StyledMain>
        <StyledMainContainer>
          <StyledTitlePegeKodi>{t("title")}</StyledTitlePegeKodi>

          <StyledKodiListItems>
            {colorRubberBaseKodi.map((base) => (
              <StyledKodiList key={base.id}>
                <StyledCardLink href={base.route}>
                  <StyledImageWrapper>
                    <StyledCertificateImage
                      src={base.image}
                      alt={t(base.titleKey)}
                      fill
                      sizes="320px"
                    />
                  </StyledImageWrapper>

                  <StyledCardTitle>{t(base.titleKey)}</StyledCardTitle>
                </StyledCardLink>
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
        "colorRubberBaseKodi",
        "categoriesBeauty",
        "brandsCatalog",
        "kodiNailsCollections",
      ])),
    },
  };
}
