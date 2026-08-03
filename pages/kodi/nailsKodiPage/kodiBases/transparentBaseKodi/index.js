import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import PageLayout from "@/components/PageLayout/PageLayout";
import CatalogCards from "@/components/Catalog/CatalogCards";

import transparatBaseListKodi from "@/lib/kodi/nailsKodiPage/baseKodiList/transparentBaseKodi";

export default function KodiPage() {
  const { t } = useTranslation(["common", "transparatBaseListKodi"]);

  return (
    <PageLayout title={t("title")} activePage="kodi">
      <CatalogCards
        items={transparatBaseListKodi}
        namespace="transparatBaseListKodi"
      />
    </PageLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "transparatBaseListKodi",
        "brandsCatalog",
      ])),
    },
  };
}
