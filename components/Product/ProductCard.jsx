import { useTranslation } from "next-i18next";

import { useCart } from "../Cart/CartContext";
import { useFavorites } from "../Favorites/FavoritesContext";

import { Button } from "../shared/Button";
import { CardImage } from "../shared/Image";

import {
  StyledProductCard,
  StyledProductImageWrapper,
  StyledProductInfo,
  StyledProductTitle,
  StyledProductArticle,
  StyledProductBottom,
  StyledProductPrice,
  StyledProductBadges,
  StyledBadge,
  StyledFavoriteButton,
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
          <StyledBadge>{t("new")}</StyledBadge>
        )}

        {product.isSale && (
          <StyledBadge>{t("sale")}</StyledBadge>
        )}
      </StyledProductBadges>

      <StyledProductImageWrapper>
        <CardImage
          src={product.image}
          alt={productName}
          fill
        />

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
          {productName}
        </StyledProductTitle>

    <StyledProductArticle>
  {stock === null || stock === 0
    ? t("outOfStock")
    : `${t("stock")}: ${stock}`}
</StyledProductArticle>

        <StyledProductBottom>
          <StyledProductPrice>
            {product.salePrice ?? product.price} грн
          </StyledProductPrice>

        <Button
  type="button"
  onClick={handleAddToCart}
  disabled={stock === null || stock === 0}
>
  🛒 {t("addToCart")}
</Button>
        </StyledProductBottom>
      </StyledProductInfo>
    </StyledProductCard>
  );
}