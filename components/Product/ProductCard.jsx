
import { useTranslation } from "next-i18next";
import Link from "next/link";

import { useCart } from "../Cart/CartContext";
import { useFavorites } from "../Favorites/FavoritesContext";

import {
  StyledProductCard,
  StyledProductImageWrapper,
  StyledProductImage,
  StyledProductInfo,
  StyledProductTitle,
  StyledProductArticle,
  StyledAddToCartButton,
  StyledProductBottom,
  StyledProductPrice,
  StyledProductBadges,
  StyledBadge,
  StyledFavoriteButton,
  StyledProductPriceWrapper,
  StyledOldPrice,
  StyledSalePrice,
  StyledDiscountBadge,
} from "./StyledProductCard";

export default function ProductCard({
  product,
  namespace,
  stock = null,
}) {
  const { t: tProduct } = useTranslation(namespace);
  const { t } = useTranslation("common");

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const productName = tProduct(product.titleKey);
  const favorite = isFavorite(product.id);

  // Перевіряємо, чи товар справді має акційну ціну
  const hasSale =
    product.isSale === true &&
    product.salePrice !== null &&
    product.salePrice !== undefined &&
    Number.isFinite(Number(product.price)) &&
    Number.isFinite(Number(product.salePrice)) &&
    Number(product.salePrice) < Number(product.price) &&
    Number(product.price) > 0;

  // Розраховуємо відсоток знижки
  const discount = hasSale
    ? Math.round(
        ((Number(product.price) - Number(product.salePrice)) /
          Number(product.price)) *
          100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      translationNamespace: namespace,
    });
  };

  const handleToggleFavorite = () => {
    toggleFavorite({
      ...product,
      translationNamespace: namespace,
    });
  };

  return (
    <StyledProductCard>
      <StyledProductBadges>
        {product.isNew && (
          <StyledBadge>
            {t("new")}
          </StyledBadge>
        )}

        {hasSale && (
          <StyledBadge>
            {t("sale")}
          </StyledBadge>
        )}
      </StyledProductBadges>

      <StyledProductImageWrapper>
        <Link
          href={`/product/${product.id}`}
          aria-label={productName}
        >
          <StyledProductImage
            src={product.image}
            alt={productName}
            fill
          />
        </Link>

        <StyledFavoriteButton
          type="button"
          onClick={handleToggleFavorite}
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {favorite ? "♥" : "♡"}
        </StyledFavoriteButton>
      </StyledProductImageWrapper>

      <StyledProductInfo>
        <StyledProductTitle>
          <Link href={`/product/${product.id}`}>
            {productName}
          </Link>
        </StyledProductTitle>

        <StyledProductArticle>
          {stock === null || stock === 0
            ? t("outOfStock")
            : `${t("stock")}: ${stock}`}
        </StyledProductArticle>

        <StyledProductBottom>
          {hasSale ? (
            <StyledProductPriceWrapper>
              <StyledSalePrice>
                {product.salePrice} грн
              </StyledSalePrice>

              <StyledOldPrice>
                {product.price} грн
              </StyledOldPrice>

              <StyledDiscountBadge>
                -{discount}%
              </StyledDiscountBadge>
            </StyledProductPriceWrapper>
          ) : (
            <StyledProductPrice>
              {product.price} грн
            </StyledProductPrice>
          )}

          <StyledAddToCartButton
            type="button"
            onClick={handleAddToCart}
            disabled={stock === null || stock === 0}
          >
            🛒 {t("addToCart")}
          </StyledAddToCartButton>
        </StyledProductBottom>
      </StyledProductInfo>
    </StyledProductCard>
  );
}
