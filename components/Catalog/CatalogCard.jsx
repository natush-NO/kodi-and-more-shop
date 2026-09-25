import {
  StyledCatalogCard,
  StyledCardLink,
  StyledCardImage,
  StyledCardTitle,
  StyledCardArrow,
} from "./StyledCatalogCards";

export default function CatalogCard({
  title,
  href,
  image,
}) {
  return (
    <StyledCatalogCard>
      <StyledCardLink href={href}>
        <StyledCardImage
          src={image}
          alt={title}
        />

        <StyledCardTitle>
          {title}
        </StyledCardTitle>

        <StyledCardArrow>
          →
        </StyledCardArrow>
      </StyledCardLink>
    </StyledCatalogCard>
  );
}