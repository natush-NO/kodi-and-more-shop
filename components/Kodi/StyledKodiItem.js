import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const StyledKodiListItems = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

export const StyledTitlePegeKodi = styled.h1`
  margin-bottom: 20px;
  font-size: 36px;
`;

export const StyledKodiList = styled.li`
  width: 370px;
  height: 400px;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  background: #fff;

  @media (min-width: 530px) {
    width: 500px;
  }

  @media (min-width: 750px) {
    width: 300px;
  }
`;

export const StyledImageLink = styled(Link)`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;

  @media (hover: hover) {
    &:hover:after {
      opacity: 1;
    }
  }
`;

export const StyledCertificateImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: block;
`;
