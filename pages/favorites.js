import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import PageLayout from "@/components/PageLayout/PageLayout";

import { useFavorites } from "@/components/Favorites/FavoritesContext";

import ProductCard from "@/components/Product/ProductCard";

import {
  StyledFavoritesPage,
  StyledFavoritesHeader,
  StyledFavoritesBack,
  StyledFavoritesTitle,
  StyledFavoritesGrid,
  StyledFavoritesEmpty,
  StyledFavoritesEmptyText,
  StyledFavoritesCatalogButton,
} from "@/components/Favorites/StyledFavorites";

export default function FavoritesPage() {
  const router = useRouter();

  const { t } = useTranslation("common");

  const { favorites } = useFavorites();

  return (
    <PageLayout activePage="favorites">
      <StyledFavoritesPage>
        <StyledFavoritesHeader>
          <StyledFavoritesBack type="button" onClick={() => router.back()}>
            {t("back")}
          </StyledFavoritesBack>

          <StyledFavoritesTitle>{t("favoritesTitle")}</StyledFavoritesTitle>
        </StyledFavoritesHeader>

        {favorites.length === 0 ? (
          <StyledFavoritesEmpty>
            <StyledFavoritesEmptyText>
              {t("favoritesEmpty")}
            </StyledFavoritesEmptyText>

            <StyledFavoritesCatalogButton
              type="button"
              onClick={() => router.push("/")}
            >
              {t("goToCatalog")}
            </StyledFavoritesCatalogButton>
          </StyledFavoritesEmpty>
        ) : (
          <StyledFavoritesGrid>
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                namespace={product.translationNamespace}
              />
            ))}
          </StyledFavoritesGrid>
        )}
      </StyledFavoritesPage>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
