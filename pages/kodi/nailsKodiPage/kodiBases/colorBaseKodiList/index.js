import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import PageLayout from "@/components/PageLayout/PageLayout";
import CatalogCards from "@/components/Catalog/CatalogCards";

import colorBaseCollectionsKodi from "@/lib/kodi/nailsKodiPage/baseKodiList/colorBaseCollectionsKodi";

export default function KodiPage() {
  const { t } = useTranslation(["common", "colorBaseCollectionsKodi"]);

  return (
    <PageLayout title={t("title")} activePage="kodi">
      <CatalogCards
        items={colorBaseCollectionsKodi}
        namespace="colorBaseCollectionsKodi"
      />
    </PageLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "colorBaseCollectionsKodi",
        "brandsCatalog",
      ])),
    },
  };
}
