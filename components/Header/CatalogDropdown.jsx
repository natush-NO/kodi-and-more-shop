import { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";

import brandsCatalog from "@/lib/kodi/brandsCatalog";
import kodiCatalogList from "@/lib/kodi/kodiCatalogList";

import {
  StyledCatalogDropdown,
  StyledCatalogButton,
  StyledCatalogMenus,
  StyledCatalogClose,
  StyledCatalogBrand,
  StyledCatalogBrandTitle,
  StyledCatalogBrandList,
  StyledCatalogBrandItem,
  StyledCatalogBrandLink,
} from "./StyledHeader";

export default function CatalogDropdown() {
  const { t } = useTranslation([
    "common",
    "brandsCatalog",
    "kodiCatalogList",
  ]);

  const [open, setOpen] = useState(false);

  const catalogRef = useRef(null);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        catalogRef.current &&
        !catalogRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <StyledCatalogDropdown ref={catalogRef}>
      <StyledCatalogButton
        type="button"
        onClick={toggleMenu}
        aria-expanded={open}
      >
        {t("catalog", { ns: "common" })}
        <span>{open ? "⌃" : "⌄"}</span>
      </StyledCatalogButton>

      {open && (
        <StyledCatalogMenus>
          <StyledCatalogClose
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t("close", { ns: "common" })}
          >
            ×
          </StyledCatalogClose>

          {brandsCatalog.map((brand) => {
            const isKodi = brand.id === "kodi";

            return (
              <StyledCatalogBrand key={brand.id}>
                <StyledCatalogBrandTitle
                  href={brand.href || "#"}
                  onClick={() => setOpen(false)}
                >
                  {t(brand.titleKey, {
                    ns:
                      brand.translation ||
                      "brandsCatalog",
                  })}
                </StyledCatalogBrandTitle>

                {isKodi && (
                  <StyledCatalogBrandList>
                    {kodiCatalogList.map((category) => (
                      <StyledCatalogBrandItem
                        key={category.id}
                      >
                        <StyledCatalogBrandLink
                          href={category.href || "#"}
                          onClick={() => setOpen(false)}
                        >
                          {t(category.titleKey, {
                            ns:
                              category.translation ||
                              "kodiCatalogList",
                          })}
                        </StyledCatalogBrandLink>
                      </StyledCatalogBrandItem>
                    ))}
                  </StyledCatalogBrandList>
                )}
              </StyledCatalogBrand>
            );
          })}
        </StyledCatalogMenus>
      )}
    </StyledCatalogDropdown>
  );
}