import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const StyledKodiListItems = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 0;
  list-style: none;
  justify-items: center;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  @media (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StyledTitlePegeKodi = styled.h1`
  margin-bottom: 25px;
  text-align: center;
  font-size: 24px;

  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

export const StyledKodiList = styled.li`
  width: 100%;
  max-width: 280px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  transition: 0.25s ease;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
    }
  }

  /* Планшети */
  @media (min-width: 600px) {
    max-width: 300px;
  }

  /* Ноутбуки */
  @media (min-width: 992px) {
    max-width: 320px;
  }

  /* Великі монітори */
  @media (min-width: 1400px) {
    max-width: 340px;
  }
`;

export const StyledImageLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
`;

export const StyledCertificateImage = styled(Image)`
  object-fit: cover;
`;
