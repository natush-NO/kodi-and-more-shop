import Link from "next/link";

import { Card, CardImageWrapper } from "../shared/Card";
import { CardImage } from "../shared/Image";

import styled from "styled-components";

const CardLink = styled(Link)`
    display:block;
    color:inherit;
    text-decoration:none;
`;

const CardTitle = styled.h2`
    padding:18px;
    text-align:center;
`;


export default function CatalogCard ({
    image,
    title,
    href,
}) {
    return (

<Card>
  <CardLink href={href}>
    <CardImageWrapper>
      <CardImage
        src={image}
        alt={title}
        fill
      />
    </CardImageWrapper>

    <CardTitle>{title}</CardTitle>
  </CardLink>
</Card>
    );
}