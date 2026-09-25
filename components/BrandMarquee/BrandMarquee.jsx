import { useTranslation } from "next-i18next";

import brandsCatalog from "@/lib/kodi/brandsCatalog";

import {
  StyledBrandMarquee,
  StyledBrandTrack,
  StyledBrandItem,
  StyledBrandLink,
  StyledBrandSeparator,
} from "./StyledBrandMarquee";

export default function BrandMarquee() {
  const { t } = useTranslation(["brandsCatalog"]);

  const items = [...brandsCatalog, ...brandsCatalog];

  return (
    <StyledBrandMarquee>
      <StyledBrandTrack>
        {items.map((brand, index) => (
          <StyledBrandItem key={`${brand.id}-${index}`}>
            <StyledBrandLink href={brand.href}>
              {t(brand.titleKey, {
                ns: brand.translation || "brandsCatalog",
              })}
            </StyledBrandLink>

            <StyledBrandSeparator>✦</StyledBrandSeparator>
          </StyledBrandItem>
        ))}
      </StyledBrandTrack>
    </StyledBrandMarquee>
  );
}