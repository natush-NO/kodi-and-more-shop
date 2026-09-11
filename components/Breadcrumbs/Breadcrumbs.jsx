import { HiChevronRight } from "react-icons/hi2";

import { BRANDS } from "@/lib/constants/brands";
import { CATEGORIESNAILS } from "@/lib/constants/categoriesNails";
import { COLLECTIONSBASES } from "@/lib/constants/collectionsBases";

import {
  StyledBreadcrumbs,
  StyledBreadcrumbLink,
  StyledBreadcrumbCurrent,
  StyledBreadcrumbSeparator,
} from "./StyledBreadcrumbs";

export default function Breadcrumbs({
  brand,
  category,
  collection,
}) {
  const items = [
    {
      label: "Головна",
      href: "/",
    },
  ];

  if (brand && BRANDS[brand]) {
    items.push({
      label: BRANDS[brand].shortName,
      href: `/${BRANDS[brand].slug}`,
    });
  }

  const categoryItem = CATEGORIESNAILS.find(
    (item) => item.id === category
  );

  if (categoryItem) {
    items.push({
      label: categoryItem.name,
      href:
        category === "base"
          ? "/kodi/nailsKodiPage"
          : undefined,
    });
  }

  if (category === "base") {
    items.push({
      label: "Кольорові бази",
      href: "/kodi/nailsKodiPage/kodiBases",
    });
  }

  const collectionItem = COLLECTIONSBASES.find(
    (item) => item.id === collection
  );

  if (collectionItem) {
    items.push({
      label: collectionItem.name,
    });
  }

  return (
    <StyledBreadcrumbs>
      {items.map((item, index) => {
        const last = index === items.length - 1;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {last ? (
              <StyledBreadcrumbCurrent>
                {item.label}
              </StyledBreadcrumbCurrent>
            ) : (
              <StyledBreadcrumbLink href={item.href}>
                {item.label}
              </StyledBreadcrumbLink>
            )}

            {!last && (
              <StyledBreadcrumbSeparator>
                <HiChevronRight />
              </StyledBreadcrumbSeparator>
            )}
          </div>
        );
      })}
    </StyledBreadcrumbs>
  );
}