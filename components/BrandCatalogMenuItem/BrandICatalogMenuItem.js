import {
  StyledCatalogMenuListItem,
  StyledCatalogMenuLink,
} from "./StyledBrandICatalogMenuItem";

export default function BrandItem({ id, name, onSelect }) {
  return (
    <StyledCatalogMenuListItem role="none">
      <StyledCatalogMenuLink
        href={`/brandsCatalog/${id}`}
        role="menuitem"
        onClick={onSelect}
      >
        {name}
      </StyledCatalogMenuLink>
    </StyledCatalogMenuListItem>
  );
}
