import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import PageLayout from "@/components/PageLayout/PageLayout";

import {
  StyledCatalogGrid,
  StyledCatalogCard,
  StyledCardLink,
  StyledCardTitle,
} from "@/components/Catalog/StyledCatalogCards";

import { COLLECTIONSBASES } from "@/lib/constants/collectionsBases";

export default function KodiBasesPage() {
  const { t } = useTranslation("common");

  return (
    <PageLayout activePage="kodi">
      <StyledCatalogGrid>
        {COLLECTIONSBASES.map((collection) => (
          <StyledCatalogCard key={collection.id}>
            <StyledCardLink
              href={`/kodi/nailsKodiPage/kodiBases/${collection.id}`}
            >
              <StyledCardTitle>{collection.name}</StyledCardTitle>
            </StyledCardLink>
          </StyledCatalogCard>
        ))}
      </StyledCatalogGrid>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
