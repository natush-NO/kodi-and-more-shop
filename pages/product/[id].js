import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";

import PageLayout from "@/components/PageLayout/PageLayout";

import { useCart } from "@/components/Cart/CartContext";
import { useFavorites } from "@/components/Favorites/FavoritesContext";

import { CardImage } from "@/components/shared/Image";

import { getProductById, getAllProducts } from "@/lib/products/getProductById";

import getPageTranslations from "@/lib/i18n/getPageTranslations";

import {
  StyledProductPage,
  StyledProductBack,
  StyledProductContent,
  StyledProductGallery,
  StyledProductMainImage,
  StyledProductInfo,
  StyledProductBrand,
  StyledProductTitle,
  StyledProductArticle,
  StyledProductDetails,
  StyledProductDetailRow,
  StyledProductPrice,
  StyledProductOldPrice,
  StyledProductActions,
  StyledQuantity,
  StyledQuantityButton,
  StyledQuantityValue,
  StyledAddToCartButton,
  StyledFavoriteButton,
  StyledProductNotFound,
} from "@/components/ProductPage/StyledProductPage";

export default function ProductPage({ product }) {
  const router = useRouter();

  const { t } = useTranslation(["common", "crystalDropsKodi", "colors"]);

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [quantity, setQuantity] = useState(1);

  if (router.isFallback) {
    return null;
  }

  if (!product) {
    return (
      <PageLayout title={t("pageNotFound", { ns: "common" })}>
        <StyledProductNotFound>
          <h1>{t("pageNotFound", { ns: "common" })}</h1>

          <Link href="/">{t("homePage", { ns: "common" })}</Link>
        </StyledProductNotFound>
      </PageLayout>
    );
  }

  const productName = t(product.titleKey, {
    ns: "crystalDropsKodi",
  });

  const colorKey = product.color.titleKey.replace("colors.", "");

  const colorName = t(colorKey, {
    ns: "colors",
  });

  const favorite = isFavorite(product.id);

  const price = product.salePrice ?? product.price;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      translationNamespace: "crystalDropsKodi",
    });
  };

  const handleToggleFavorite = () => {
    toggleFavorite({
      ...product,
      translationNamespace: "crystalDropsKodi",
    });
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <PageLayout title={productName}>
      <StyledProductPage>
        <StyledProductBack href="/">
          ← {t("back", { ns: "common" })}
        </StyledProductBack>

        <StyledProductContent>
          <StyledProductGallery>
            <StyledProductMainImage>
              <CardImage src={product.image} alt={productName} fill />
            </StyledProductMainImage>
          </StyledProductGallery>

          <StyledProductInfo>
            <StyledProductBrand>KODI</StyledProductBrand>

            <StyledProductTitle>{productName}</StyledProductTitle>

            <StyledProductArticle>
              {t("article", { ns: "common" })} {product.barcode}
            </StyledProductArticle>

            <StyledProductDetails>
              <StyledProductDetailRow>
                <span>{t("volume", { ns: "common" })}</span>

                <span>
                  {product.volume.value} {product.volume.unit}
                </span>
              </StyledProductDetailRow>

              <StyledProductDetailRow>
                <span>{t("color", { ns: "common" })}</span>

                <span>{colorName}</span>
              </StyledProductDetailRow>

              <StyledProductDetailRow>
                <span>{t("stock", { ns: "common" })}</span>

                <span>
                  {product.inStock
                    ? t("stock", { ns: "common" })
                    : t("outOfStock", {
                        ns: "common",
                      })}
                </span>
              </StyledProductDetailRow>
            </StyledProductDetails>

            <StyledProductPrice>
              {product.salePrice ? (
                <>
                  <StyledProductOldPrice>
                    {product.price} грн
                  </StyledProductOldPrice>
                  {product.salePrice} грн
                </>
              ) : (
                `${price} грн`
              )}
            </StyledProductPrice>

            <StyledProductActions>
              <StyledQuantity>
                <StyledQuantityButton type="button" onClick={decreaseQuantity}>
                  −
                </StyledQuantityButton>

                <StyledQuantityValue>{quantity}</StyledQuantityValue>

                <StyledQuantityButton type="button" onClick={increaseQuantity}>
                  +
                </StyledQuantityButton>
              </StyledQuantity>

              <StyledAddToCartButton
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                🛒{" "}
                {t("addToCart", {
                  ns: "common",
                })}
              </StyledAddToCartButton>
            </StyledProductActions>

            <StyledFavoriteButton type="button" onClick={handleToggleFavorite}>
              {favorite ? "♥" : "♡"}{" "}
              {favorite
                ? t("removeFromFavorites", {
                    ns: "common",
                  })
                : t("addToFavorites", {
                    ns: "common",
                  })}
            </StyledFavoriteButton>
          </StyledProductInfo>
        </StyledProductContent>
      </StyledProductPage>
    </PageLayout>
  );
}

export async function getStaticProps({ params, locale }) {
  const product = getProductById(params.id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,

      ...(await getPageTranslations(locale, ["crystalDropsKodi", "colors"])),
    },
  };
}

export async function getStaticPaths() {
  const products = getAllProducts();

  return {
    paths: products.map((product) => ({
      params: {
        id: product.id,
      },
    })),

    fallback: false,
  };
}
