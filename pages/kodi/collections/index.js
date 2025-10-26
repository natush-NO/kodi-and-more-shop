// pages/kodi/collections/index.js
import Header from "@/components/Header/Header";
import { StyledMain, StyledMainContainer } from "@/components/StyledIndex";
import {
  StyledKodiListItems,
  StyledTitlePegeKodi,
  StyledKodiList,
  StyledImageLink,
  StyledCertificateImage,
} from "@/components/Kodi/StyledKodiItem";
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
                  <StyledImageLink href={href}>
                    <StyledCertificateImage
                      src={collection.imageUrl || "/placeholder_image.webp"}
                      alt={label}
                      title={label}
                      fill
                      priority
                    />
                  </StyledImageLink>
                  <div
                    style={{ marginTop: 8, textAlign: "center", fontSize: 18 }}
                  >
                    {label}
                  </div>
                  <div
                    style={{ marginTop: 8, textAlign: "center", fontSize: 18 }}
                  >
                    {collection.count}
                  </div>
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
  const { default: kodiNailsCollections } = await import(
    "@/lib/kodi/baseKodi/kodiNailsCollections"
  );
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
