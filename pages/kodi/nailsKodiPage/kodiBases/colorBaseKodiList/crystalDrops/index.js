import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import PageLayout from "@/components/PageLayout/PageLayout";
import Filters from "@/components/Filters/Filters";

import ProductGrid from "@/components/Catalog/ProductGrid";

import {
  StyledCatalogLayout,
  StyledProducts,
} from "@/components/Catalog/StyledCatalogCards";

import crystalDropsKodi from "@/lib/kodi/nailsKodiPage/baseKodiList/colorBaseCollectionsKodi/crystalDropsBaseKodi";

export default function CrystalDropsPage() {
  const { t } = useTranslation(["common", "crystalDropsKodi"]);

  const [filters, setFilters] = useState({
    collections: [],
    colors: [],
    volumes: [],
  });

  const collections = ["Crystal Drops"];

  const colors = [
    {
      name: "white",
      label: "Білий",
      code: "#ffffff",
    },
    {
      name: "milk",
      label: "Молочний",
      code: "#f5f5f5",
    },
    {
      name: "pink",
      label: "Рожевий",
      code: "#f7b6d2",
    },
  ];

  const volumes = [7, 12, 30];

  return (
    <PageLayout title={t("title")} activePage="kodi">
      <StyledCatalogLayout>
        <Filters
          collections={collections}
          colors={colors}
          volumes={volumes}
          filters={filters}
          setFilters={setFilters}
        />

        <StyledProducts>
          <ProductGrid
            products={crystalDropsKodi}
            namespace="crystalDropsKodi"
          />
        </StyledProducts>
      </StyledCatalogLayout>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "crystalDropsKodi",
        "brandsCatalog",
      ])),
    },
  };
}
