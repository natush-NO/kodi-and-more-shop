import { useEffect, useMemo, useState } from "react";

import { useTranslation } from "next-i18next";

import allProducts from "@/lib/allProducts";

import {
  StyledSearchOverlay,
  StyledSearchWindow,
  StyledSearchHeader,
  StyledSearchInputWrapper,
  StyledSearchInput,
  StyledSearchClose,
  StyledSearchResults,
  StyledSearchResult,
  StyledSearchResultImage,
  StyledSearchResultInfo,
  StyledSearchResultTitle,
  StyledSearchResultPrice,
  StyledSearchEmpty,
} from "./StyledSearch";

function SearchResultItem({
  product,
  productName,
  onClose,
}) {
  return (
    <StyledSearchResult
      href={product.href}
      onClick={onClose}
    >
      <StyledSearchResultImage
        src={product.image}
        alt={productName}
      />

      <StyledSearchResultInfo>
        <StyledSearchResultTitle>
          {productName}
        </StyledSearchResultTitle>

        <StyledSearchResultPrice>
          {product.salePrice ?? product.price} грн
        </StyledSearchResultPrice>
      </StyledSearchResultInfo>
    </StyledSearchResult>
  );
}

export default function Search({
  open,
  onClose,
}) {
  const { t: tCommon, i18n } =
    useTranslation("common");

  const [query, setQuery] = useState("");
  const [translationsReady, setTranslationsReady] =
    useState(false);

  /*
   * Отримуємо всі namespace-и товарів.
   *
   * Зараз це, наприклад:
   * crystalDropsKodi
   *
   * У майбутньому сюди автоматично
   * додадуться namespace-и інших товарів.
   */
  const productNamespaces = useMemo(() => {
    return [
      ...new Set(
        allProducts
          .map(
            (product) =>
              product.translationNamespace
          )
          .filter(Boolean)
      ),
    ];
  }, []);

  /*
   * Завантажуємо переклади товарів.
   *
   * Це важливо, тому що Search відкривається
   * поверх будь-якої сторінки, а namespace товару
   * може бути не завантажений на поточній сторінці.
   */
  useEffect(() => {
    let active = true;

    if (!open) {
      return;
    }

    setTranslationsReady(false);

    i18n
      .loadNamespaces(productNamespaces)
      .then(() => {
        if (active) {
          setTranslationsReady(true);
        }
      })
      .catch((error) => {
        console.error(
          "Failed to load product translations:",
          error
        );

        if (active) {
          setTranslationsReady(true);
        }
      });

    return () => {
      active = false;
    };
  }, [open, i18n, productNamespaces]);

  /*
   * Отримуємо назву товару поточною мовою.
   */
  const getProductName = (product) => {
    if (!product.translationNamespace) {
      return product.titleKey;
    }

    return i18n.t(product.titleKey, {
      ns: product.translationNamespace,
    });
  };

  const searchValue = query
    .trim()
    .toLowerCase();

  /*
   * Фільтруємо товари.
   *
   * Пошук працює по:
   * - перекладеній назві товару;
   * - barcode;
   * - brand;
   * - collection.
   */
  const filteredProducts = useMemo(() => {
    if (!searchValue || !translationsReady) {
      return [];
    }

    return allProducts.filter((product) => {
      const productName =
        getProductName(product);

      const searchableText = [
        productName,
        product.barcode,
        product.brand,
        product.collection,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(
        searchValue
      );
    });
  }, [
    searchValue,
    translationsReady,
    i18n,
  ]);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <StyledSearchOverlay
      onClick={handleClose}
    >
      <StyledSearchWindow
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <StyledSearchHeader>
          <StyledSearchInputWrapper>
            <StyledSearchInput
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder={tCommon(
                "searchPlaceholder"
              )}
              autoFocus
            />
          </StyledSearchInputWrapper>

          <StyledSearchClose
            type="button"
            onClick={handleClose}
            aria-label={tCommon("search")}
          >
            ×
          </StyledSearchClose>
        </StyledSearchHeader>

        {searchValue && (
          <StyledSearchResults>
            {!translationsReady ? (
              null
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <SearchResultItem
                  key={product.id}
                  product={product}
                  productName={getProductName(
                    product
                  )}
                  onClose={handleClose}
                />
              ))
            ) : (
              <StyledSearchEmpty>
                {tCommon("nothingFound")}
              </StyledSearchEmpty>
            )}
          </StyledSearchResults>
        )}
      </StyledSearchWindow>
    </StyledSearchOverlay>
  );
}