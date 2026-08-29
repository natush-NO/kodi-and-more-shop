import { useState } from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import PageLayout from "@/components/PageLayout/PageLayout";

import FilterButton from "@/components/Filters/FilterButton";
import MobileFilters from "@/components/Filters/MobileFilters";
import Filters from "@/components/Filters/Filters";
import ProductGrid from "@/components/Catalog/ProductGrid";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

import {
  StyledCatalogPage,
  StyledCatalogHeader,
  StyledCatalogTitle,
  StyledCatalogSubtitle,
  StyledCatalogLayout,
  StyledProducts,
} from "@/components/Catalog/StyledCatalogCards";

import crystalDropsKodi from "@/lib/kodi/nailsKodiPage/baseKodiList/colorBaseCollectionsKodi/crystalDropsBaseKodi";
import reflectiveKodi from "@/lib/kodi/nailsKodiPage/baseKodiList/colorBaseCollectionsKodi/reflectiveBaseKodi";
// import colorRubberBaseKodi from "@/lib/kodi/nailsKodiPage/baseKodiList/colorBaseCollectionsKodi/colorRubberBaseKodi";

import { COLLECTIONSBASES } from "@/lib/constants/collectionsBases";
import { CATEGORIESNAILS } from "@/lib/constants/categoriesNails";
import { COLORS } from "@/lib/constants/colors";
import { VOLUMES } from "@/lib/constants/volumes";
import { BRANDS } from "@/lib/constants/brands";

export default function KodiBaseCollectionPage({ collection, products }) {
  const [filters, setFilters] = useState({
    categories: [],
    collections: [collection.id],
    colors: [],
    volumes: [],
    brands: [],
  });

  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    // Бренд
    if (
      filters.brands.length > 0 &&
      !filters.brands.includes(product.brand.toLowerCase())
    ) {
      return false;
    }

    // Категорія
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category.toLowerCase())
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
    <PageLayout activePage="kodi">
      <StyledCatalogPage>
        <Breadcrumbs brand="kodi" category="base" collection={collection.id} />

        <FilterButton onClick={() => setFiltersOpen(true)} />

        <MobileFilters
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          categories={CATEGORIESNAILS}
          collections={COLLECTIONSBASES}
          colors={Object.values(COLORS)}
          volumes={VOLUMES}
          brands={Object.values(BRANDS)}
          filters={filters}
          setFilters={setFilters}
        />

        <StyledCatalogHeader>
          <StyledCatalogTitle>{collection.name}</StyledCatalogTitle>

          <StyledCatalogSubtitle>
            Кольорові бази для нігтів
          </StyledCatalogSubtitle>
        </StyledCatalogHeader>

        <StyledCatalogLayout>
          <Filters
            categories={CATEGORIESNAILS}
            collections={COLLECTIONSBASES}
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
      </StyledCatalogPage>
    </PageLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: COLLECTIONSBASES.map((collection) => ({
      params: {
        collectionbase: collection.id,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const collection = COLLECTIONSBASES.find(
    (item) => item.id === params.collectionbase,
  );

  if (!collection) {
    return {
      notFound: true,
    };
  }

  const products = [
    ...crystalDropsKodi,
    // ...reflectiveKodi,
    // ...colorRubberBaseKodi,
  ];

  return {
    props: {
      collection,
      products,
      ...(await serverSideTranslations(locale, [
        "common",
        "colors",
        "brands",
        "crystalDropsKodi",
      ])),
    },
  };
}
