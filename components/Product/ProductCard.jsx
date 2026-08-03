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
} from "./StyledProductCard";

export default function ProductCard({ product }) {
  return (
    <StyledProductCard>
      <StyledProductBadges>
        {product.isNew && <StyledBadge>NEW</StyledBadge>}

        {product.sale && <StyledBadge>SALE</StyledBadge>}
      </StyledProductBadges>

      <StyledProductImageWrapper>
        <CardImage
          src={product.image}
          alt={product.name}
          fill
        />
      </StyledProductImageWrapper>

      <StyledProductInfo>
        <StyledProductTitle>
          {product.name}
        </StyledProductTitle>

        <StyledProductArticle>
          Арт.: {product.article}
        </StyledProductArticle>

        <StyledProductBottom>
          <StyledProductPrice>
            {product.price} грн
          </StyledProductPrice>

          <Button>
            🛒 Додати у кошик
          </Button>
        </StyledProductBottom>
      </StyledProductInfo>
    </StyledProductCard>
  );
}