import { useEffect, useState } from "react";

import ProductCard from "../Product/ProductCard";

import { StyledCatalogGrid } from "./StyledCatalogCards";

export default function ProductGrid({
  products,
  namespace,
}) {
  const [stockMap, setStockMap] = useState({});
  const [stockLoading, setStockLoading] = useState(true);

  useEffect(() => {
    const barcodes = products
      .map((product) => product.barcode)
      .filter(Boolean)
      .map((barcode) => String(barcode));

    if (barcodes.length === 0) {
      setStockMap({});
      setStockLoading(false);
      return;
    }

    const loadStock = async () => {
      try {
        setStockLoading(true);

        const response = await fetch(
          "/api/checkbox-stock",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              barcodes,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to load Checkbox stock"
          );
        }

        setStockMap(data.stock || {});
      } catch (error) {
        console.error(
          "Failed to load Checkbox stock:",
          error
        );

        setStockMap({});
      } finally {
        setStockLoading(false);
      }
    };

    loadStock();
  }, [products]);

  return (
    <StyledCatalogGrid>
      {products.map((product) => {
        const productBarcode = product.barcode
          ? String(product.barcode)
          : "";

        const stock =
          productBarcode &&
          Object.prototype.hasOwnProperty.call(
            stockMap,
            productBarcode
          )
            ? stockMap[productBarcode]
            : null;

        return (
          <ProductCard
            key={product.id}
            product={product}
            namespace={namespace}
            stock={stockLoading ? null : stock}
          />
        );
      })}
    </StyledCatalogGrid>
  );
}