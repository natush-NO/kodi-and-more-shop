import { useTranslation } from "next-i18next";

import CatalogCard from "./CatalogCard";

import {
  StyledCatalogSection,
  StyledCatalogGrid,
} from "./StyledCatalogCards";

export default function CatalogCards({ items }) {
  const { t } = useTranslation(["common", "brandsCatalog"]);

  return (
    <StyledCatalogSection>
      <StyledCatalogGrid>
        {items.map((item) => (
          <CatalogCard
            key={item.id}
            image={item.image}
            title={t(item.titleKey, {
              ns: item.translation || "brandsCatalog",
            })}
            href={item.href}
          />
        ))}
      </StyledCatalogGrid>
    </StyledCatalogSection>
  );
}