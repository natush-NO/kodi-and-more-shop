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

import kodiCatalogList from "@/lib/kodi/kodiCatalogList";

export default function KodiPage() {
  const { t } = useTranslation(["common", "kodiCatalogList"]);

  return (
    <PageLayout title="Kodi" activePage="kodi">
      <StyledCatalogGrid>
        {kodiCatalogList.map((item) => (
          <StyledCatalogCard key={item.id}>
            <StyledCardLink href={item.href}>
              {item.image && (
                <StyledCardImage
                  src={item.image}
                  alt={t(item.titleKey, {
                    ns: "kodiCatalogList",
                  })}
                  width={400}
                  height={400}
                />
              )}

              <StyledCardTitle>
                {t(item.titleKey, {
                  ns: "kodiCatalogList",
                })}
              </StyledCardTitle>
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
      ...(await serverSideTranslations(locale, ["common", "kodiCatalogList"])),
    },
  };
}
