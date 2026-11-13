
import { useEffect, useMemo, useState } from "react";

import ProductCard from "../Product/ProductCard";
import { Grid } from "../shared/Grid";

export default function ProductGrid({ products, namespace }) {
  const barcodes = useMemo(
    () =>
      products
        .map((product) => product.barcode)
        .filter(Boolean)
        .map((barcode) => String(barcode)),
    [products],
  );

  const barcodeKey = JSON.stringify(barcodes);

  const [stockResult, setStockResult] = useState({
    key: null,
    stock: {},
  });

  useEffect(() => {
    const currentBarcodes = JSON.parse(barcodeKey);

    if (currentBarcodes.length === 0) return;

    let isActive = true;

    const loadStock = async () => {
      let stock = {};

      try {
        const response = await fetch("/api/checkbox-stock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            barcodes: currentBarcodes,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load Checkbox stock",
          );
        }

        stock = data.stock || {};
      } catch (error) {
        console.error("Failed to load Checkbox stock:", error);
      } finally {
        if (isActive) {
          setStockResult({
            key: barcodeKey,
            stock,
          });
        }
      }
    };

    loadStock();

    return () => {
      isActive = false;
    };
  }, [barcodeKey]);

  const stockLoading =
    barcodes.length > 0 && stockResult.key !== barcodeKey;

  const stockMap =
    stockResult.key === barcodeKey ? stockResult.stock : {};

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
            productBarcode,
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
