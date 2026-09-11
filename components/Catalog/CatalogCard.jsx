import {
  StyledCatalogCard,
  StyledCardLink,
  StyledCardTitle,
} from "./StyledCatalogCards";

export default function CatalogCard({
  title,
  href,
}) {
  return (
    <StyledCatalogCard>
      <StyledCardLink href={href}>
        <StyledCardTitle>{title}</StyledCardTitle>
      </StyledCardLink>
    </StyledCatalogCard>
  );
}