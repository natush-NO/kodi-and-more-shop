
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

// Отримуємо назву товару поточною мовою
function getProductName(product, i18n) {
  if (!product.translationNamespace) {
    return product.titleKey;
  }

  return i18n.t(product.titleKey, {
    ns: product.translationNamespace,
  });
}

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

export default function Search({ open, onClose }) {
  const { t: tCommon, i18n } = useTranslation("common");

  const [query, setQuery] = useState("");
  const [loadedLanguage, setLoadedLanguage] = useState(null);

  // Отримуємо namespace-и всіх товарів
  const productNamespaces = useMemo(
    () => [
      ...new Set(
        allProducts
          .map((product) => product.translationNamespace)
          .filter(Boolean),
      ),
    ],
    [],
  );

  // Перевіряємо готовність перекладів поточною мовою
  const translationsReady = loadedLanguage === i18n.language;

  // Завантажуємо переклади товарів
  useEffect(() => {
    if (!open || translationsReady) {
      return;
    }

    let active = true;

    i18n
      .loadNamespaces(productNamespaces)
      .then(() => {
        if (active) {
          setLoadedLanguage(i18n.language);
        }
      })
      .catch((error) => {
        console.error(
          "Failed to load product translations:",
          error,
        );

        if (active) {
          setLoadedLanguage(i18n.language);
        }
      });

    return () => {
      active = false;
    };
  }, [
    open,
    i18n,
    i18n.language,
    productNamespaces,
    translationsReady,
  ]);

  const searchValue = query.trim().toLowerCase();

  // Фільтруємо товари
  const filteredProducts = useMemo(() => {
    if (!searchValue || !translationsReady) {
      return [];
    }

    return allProducts.filter((product) => {
      const productName = getProductName(product, i18n);

      const searchableText = [
        productName,
        product.barcode,
        product.brand,
        product.collection,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchValue);
    });
  }, [searchValue, translationsReady, i18n]);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <StyledSearchOverlay onClick={handleClose}>
      <StyledSearchWindow
        onClick={(event) => event.stopPropagation()}
      >
        <StyledSearchHeader>
          <StyledSearchInputWrapper>
            <StyledSearchInput
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={tCommon("searchPlaceholder")}
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
                  productName={getProductName(product, i18n)}
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
