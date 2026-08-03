import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export const StyledCatalogGrid = styled.ul`
  width: 100%;

  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(280px, 320px));

  justify-content: center;

  gap: 30px;

  padding: 0;

  list-style: none;
`;

export const StyledCatalogCard = styled.li`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);

  transition: 0.25s;

  &:hover {
    transform: translateY(-4px);

    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
  }
`;

export const StyledCardLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

export const StyledCardImage = styled(Image)`
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
`;

export const StyledCardTitle = styled.h2`
  padding: 18px;

  text-align: center;

  font-size: 18px;

  font-weight: 600;
`;

export const StyledCatalogLayout = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-start;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const StyledProducts = styled.div`
  flex: 1;
`;
