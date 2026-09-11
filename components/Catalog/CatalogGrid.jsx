import { StyledCatalogGrid } from "./StyledCatalogCards";

export default function CatalogGrid({ children }) {
  return (
    <StyledCatalogGrid>
      {children}
    </StyledCatalogGrid>
  );
}