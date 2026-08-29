import ProductCard from "../Product/ProductCard";

import { StyledCatalogGrid } from "./StyledCatalogCards";

export default function ProductGrid({
  products,
  namespace,
}) {
  return (
    <StyledCatalogGrid>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          namespace={namespace}
        />
      ))}
    </StyledCatalogGrid>
  );
}