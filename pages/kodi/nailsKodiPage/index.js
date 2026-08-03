import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import PageLayout from "@/components/PageLayout/PageLayout";
import CatalogCards from "@/components/Catalog/CatalogCards";

import nailsPageKodi from "@/lib/kodi/nailsKodiPage";

export default function KodiNailsPage() {
  const { t } = useTranslation(["common", "nailsPageKodi"]);

  return (
    <PageLayout title={t("title")} activePage="kodi">
      <CatalogCards items={nailsPageKodi} namespace="nailsPageKodi" />
    </PageLayout>
  );
}

export async function getStaticProps({ locale }) {
  const { default: kodi } = await import("@/lib/kodi/nailsKodiPage");
  return {
    props: {
      kodi,
      ...(await serverSideTranslations(locale, [
        "common",
        "nailsPageKodi",
        "brandsCatalog",
      ])),
    },
  };
}
