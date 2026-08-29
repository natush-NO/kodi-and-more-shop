import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import PageLayout from "@/components/PageLayout/PageLayout";

import {
  StyledCatalogGrid,
  StyledCatalogCard,
  StyledCardLink,
  StyledCardImage,
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
              {item.image && (
                <StyledCardImage
                  src={item.image}
                  alt={t(item.titleKey)}
                  width={400}
                  height={400}
                />
              )}

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
    props: {
      ...(await serverSideTranslations(locale, ["common", "nailsPageKodi"])),
    },
  };
}
