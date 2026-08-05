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
import { VOLUMES } from "@/lib/constants/volumes";
import { COLORS } from "@/lib/constants/colors";
import { BRANDS } from "@/lib/constants/brands";
import { COLLECTIONS } from "@/lib/constants/collections";

export default function CrystalDropsPage() {
  const { t } = useTranslation(["common", "colors", "crystalDropsKodi"]);
  const [filters, setFilters] = useState({
    collections: [],
    colors: [],
    volumes: [],
    brands: [],
  });

  const filteredProducts = crystalDropsKodi.filter((product) => {
    // Бренд
    if (
      filters.brands.length > 0 &&
      !filters.brands.includes(product.brand.toLowerCase())
    ) {
      return false;
    }

    // Колекція
    if (
      filters.collections.length > 0 &&
      !filters.collections.includes(product.collection)
    ) {
      return false;
    }

    // Колір
    if (
      filters.colors.length > 0 &&
      !filters.colors.includes(product.color.id)
    ) {
      return false;
    }

    // Об'єм
    if (
      filters.volumes.length > 0 &&
      !filters.volumes.includes(product.volume.value)
    ) {
      return false;
    }

    return true;
  });
  return (
    <PageLayout title={t("title")} activePage="kodi">
      <StyledCatalogLayout>
        <Filters
          collections={COLLECTIONS}
          colors={Object.values(COLORS)}
          volumes={VOLUMES}
          brands={Object.values(BRANDS)}
          filters={filters}
          setFilters={setFilters}
        />

        <StyledProducts>
          <ProductGrid
            products={filteredProducts}
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
        "colors",
        "brands",
        "crystalDropsKodi",
        "brandsCatalog",
      ])),
    },
  };
}
