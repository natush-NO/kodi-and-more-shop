import Header from "@/components/Header/Header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { StyledMain, StyledMainContainer } from "@/components/StyledIndex";
import {
  StyledKodiListItems,
  StyledKodiList,
  StyledTitlePegeKodi,
  StyledImageLink,
  StyledCertificateImage,
} from "@/components/Kodi/StyledCartItem";
import colorRubberBaseKodi from "@/lib/kodi/baseKodi/colorBaseCollectionsKodi/colorRubberBaseKodiIndex";

export default function BasesIndex() {
  const { t, i18n } = useTranslation(["colorRubberBaseKodi", "common"]);

  return (
    <>
      <Header kodiPage />

      <StyledMain>
        <StyledMainContainer>
          <StyledTitlePegeKodi>{t("title")}</StyledTitlePegeKodi>

          <StyledKodiListItems>
            {colorRubberBaseKodi.map((base) => (
              <StyledKodiList key={base.id}>
                <StyledImageLink href={base.route}>
                  <StyledCertificateImage
                    src={base.image}
                    alt={t(base.titleKey)}
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
                  {t(base.titleKey)}
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
        "colorRubberBaseKodi",
        "categoriesBeauty",
        "brandsCatalog",
        "kodiNailsCollections",
      ])),
    },
  };
}
