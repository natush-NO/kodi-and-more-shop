import { useEffect, useState } from "react";

import ProductCard from "../Product/ProductCard";
import { Grid } from "../shared/Grid";

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
      setStockLoading(false);
      return;
    }

    const loadStock = async () => {
      try {
        const response = await fetch("/api/checkbox-stock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            barcodes,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load Checkbox stock"
          );
        }

        setStockMap(data.stock || {});
      } catch (error) {
        console.error(
          "Failed to load Checkbox stock:",
          error
        );
      } finally {
        setStockLoading(false);
      }
    };

    loadStock();
  }, [products]);

  return (
    <Grid>
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
            stock={stock}
            stockLoading={stockLoading}
          />
        );
      })}
    </Grid>
  );
}