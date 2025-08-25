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

export default function KodiNailsPage({ kodi }) {
  const { t } = useTranslation(["categoriesNails", "common"]);

  return (
    <>
      <Header kodiPage />
      <StyledMain>
        <StyledMainContainer>
          <StyledTitlePegeKodi>Kodi</StyledTitlePegeKodi>

          <StyledCategoryGrid>
            {kodi.map((cat) => {
              const href =
                cat.route && cat.route !== "#" ? cat.route : `/kodi/${cat.id}`;
              const label = t(cat.nameKey, { ns: "categoriesNails" });

              console.log("categoriesNails.gelPolish:", t("gelPolish"));

              return (
                <StyledKodiList key={cat.id}>
                  <StyledImageLink href={href}>
                    {/* <StyledCertificateImage
                      // src={cat.imageUrl || "/placeholder_image.webp"}
                      alt={label}
                      title={label}
                      fill
                      role="img"
                      aria-label={label}
                      priority
                    /> */}
                  </StyledImageLink>
                  <div
                    style={{ marginTop: 8, textAlign: "center", fontSize: 18 }}
                  >
                    {label}
                  </div>
                </StyledKodiList>
              );
            })}
          </StyledCategoryGrid>
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
        "categoriesNails",
        "categoriesBeauty",
      ])),
    },
  };
}
