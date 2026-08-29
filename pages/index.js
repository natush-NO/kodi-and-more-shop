import brandsCatalog from "@/lib/kodi/brandsCatalog";

import PageLayout from "@/components/PageLayout/PageLayout";
import CatalogCards from "@/components/Catalog/CatalogCards";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function HomePage() {
  const { t } = useTranslation(["common", "brandsCatalog"]);

  return (
    <PageLayout title={t("title", { ns: "common" })} activePage="kodi">
      <CatalogCards items={brandsCatalog} namespace="brandsCatalog" />
    </PageLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "brandsCatalog"])),
    },
  };
}
