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
import transparatBaseListKodi from "@/lib/kodi/kodiTransparent";

export default function TransparentBasesPage() {
  const { t, i18n } = useTranslation(["transparatBaseListKodi", "common"]);
  return (
    <>
      <Header kodiPage />

      <StyledMain>
        <StyledMainContainer>
          <StyledTitlePegeKodi>{t("title")}</StyledTitlePegeKodi>

          <StyledKodiListItems>
            {transparatBaseListKodi.map((transparat) => (
              <StyledKodiList key={transparat.id}>
                <StyledImageLink href={transparat.route}>
                  <StyledCertificateImage
                    src={transparat.image}
                    alt={t(transparat.titleKey)}
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
                  {t(transparat.titleKey)}
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
        "transparatBaseListKodi",
        "categoriesBeauty",
        "brandsCatalog",
        "kodiNailsCollections",
      ])),
    },
  };
}
