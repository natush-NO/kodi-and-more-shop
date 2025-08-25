// pages/kodiPage.js
import { styled } from "styled-components";
import Header from "@/components/Header/Header";
import { StyledMain, StyledMainContainer } from "@/components/StyledIndex";
import {
  StyledKodiList,
  StyledImageLink,
  StyledCertificollectioneImage,
} from "@/components/Kodi/StyledKodiItem";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const StyledCollectionegoryGrid = styled.ul`
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

export default function kodiNailsCollectionsPage({ kodiNailsCollections }) {
  const { t } = useTranslation(["collectionegoriesNails", "common"]);

  return (
    <>
      <Header kodiPage />
      <StyledMain>
        <StyledMainContainer>
          <StyledTitlePegeKodi>Kodi</StyledTitlePegeKodi>

          <StyledCollectionegoryGrid>
            {kodiNailsCollections.map((collection) => {
              const href =
                collection.route && collection.route !== "#"
                  ? collection.route
                  : `/kodiNailsCollections/${collection.id}`;
              const label = t(collection.name, {
                ns: "kodiNailsCollections",
              });
              const count = t(collection.count, {
                ns: "kodiNailsCollections",
              });

              console.log(
                "kodiNailsCollections.5d-moon-light:",
                t("5d-moon-light")
              );

              return (
                <StyledKodiList key={collection.id}>
                  <StyledImageLink href={href}>
                    {/* <StyledCertificollectioneImage
                      // src={collection.imageUrl || "/placeholder_image.webp"}
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
                  <div
                    style={{ marginTop: 8, textAlign: "center", fontSize: 18 }}
                  >
                    {count}
                  </div>
                </StyledKodiList>
              );
            })}
          </StyledCollectionegoryGrid>
        </StyledMainContainer>
      </StyledMain>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const { default: kodiNailsCollections } = await import(
    "@/lib/kodiNailsCollections"
  );

  return {
    props: {
      kodiNailsCollections,
      ...(await serverSideTranslations(locale, ["kodiNailsCollections"])),
    },
  };
}
