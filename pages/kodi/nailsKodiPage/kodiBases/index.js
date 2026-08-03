import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import PageLayout from "@/components/PageLayout/PageLayout";
import CatalogCards from "@/components/Catalog/CatalogCards";

import kodiBasesList from "@/lib/kodi/nailsKodiPage/baseKodiList";

export default function KodiPage() {
  const { t } = useTranslation(["common", "kodiBasesList"]);

  return (
    <PageLayout title={t("title")} activePage="kodi">
      <CatalogCards items={kodiBasesList} namespace="kodiBasesList" />
    </PageLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "kodiBasesList",
        "brandsCatalog",
      ])),
    },
  };
}
