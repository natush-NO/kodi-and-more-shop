import { useTranslation } from "next-i18next";

import ProductCard from "../Product/ProductCard";

import { StyledCatalogGrid } from "./StyledCatalogCards";

export default function ProductGrid({
  products,
  namespace,
}) {
  const { t } = useTranslation(namespace);

  return (
    <StyledCatalogGrid>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={{
            ...product,
            name: t(product.titleKey),
          }}
        />
      ))}
    </StyledCatalogGrid>
  );
}