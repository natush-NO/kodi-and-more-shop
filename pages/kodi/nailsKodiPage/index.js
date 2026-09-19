import { useTranslation } from "next-i18next";
import getPageTranslations from "@/lib/i18n/getPageTranslations";

import PageLayout from "@/components/PageLayout/PageLayout";

import {
  StyledCatalogGrid,
  StyledCatalogCard,
  StyledCardLink,
  StyledCardTitle,
} from "@/components/Catalog/StyledCatalogCards";

import nailsPageKodi from "@/lib/kodi/nailsPageKodi";

export default function NailsKodiPage() {
  const { t } = useTranslation("nailsPageKodi");

  return (
    <PageLayout title={t("title")} activePage="kodi">
      <StyledCatalogGrid>
        {nailsPageKodi.map((item) => (
          <StyledCatalogCard key={item.id}>
            <StyledCardLink href={item.href}>
              <StyledCardTitle>{t(item.titleKey)}</StyledCardTitle>
            </StyledCardLink>
          </StyledCatalogCard>
        ))}
      </StyledCatalogGrid>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: await getPageTranslations(locale, ["nailsPageKodi"]),
  };
}
