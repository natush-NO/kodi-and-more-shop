// pages/kodi/collections/index.js
import Header from "@/components/Header/Header";
import { StyledMain, StyledMainContainer } from "@/components/StyledIndex";
import {
  StyledKodiListItems,
  StyledTitlePegeKodi,
  StyledKodiList,
  StyledCardLink,
  StyledImageWrapper,
  StyledCertificateImage,
  StyledCardTitle,
  StyledCardCount,
} from "@/components/Kodi/StyledCartItem";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function KodiNailsCollectionsPage({ kodiNailsCollections }) {
  const { t } = useTranslation(["kodiNailsCollections", "common"]);

  return (
    <>
      <Header kodiPage />
      <StyledMain>
        <StyledMainContainer>
          <StyledTitlePegeKodi>0</StyledTitlePegeKodi>

          <StyledKodiListItems>
            {kodiNailsCollections.map((collection) => {
              const href =
                collection.route && collection.route !== "#"
                  ? collection.route
                  : `/kodi/collections/${collection.id}`;
              const label = t(collection.nameKey);

              return (
                <StyledKodiList key={collection.id}>
                  <StyledCardLink href={href}>
                    <StyledImageWrapper>
                      <StyledCertificateImage
                        src={collection.imageUrl || "/placeholder_image.webp"}
                        alt={label}
                        title={label}
                        fill
                        priority
                      />
                    </StyledImageWrapper>

                    <StyledCardTitle>{label}</StyledCardTitle>

                    <StyledCardCount>{collection.count}</StyledCardCount>
                  </StyledCardLink>
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
  const { default: kodiNailsCollections } =
    await import("@/lib/kodi/kodiNailsCollections");
  return {
    props: {
      kodiNailsCollections,
      ...(await serverSideTranslations(locale, [
        "common",
        "kodiNailsCollections",
      ])),
    },
  };
}
