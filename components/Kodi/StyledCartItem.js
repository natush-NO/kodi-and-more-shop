import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const StyledKodiListItems = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 320px));
  justify-content: center;
  gap: 30px;
  padding: 0;
  list-style: none;
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
`;

// export const StyledKodiList = styled.li`
//   width: 100%;
//   max-width: 280px;
//   background: #fff;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
//   transition: 0.25s ease;

//   @media (hover: hover) {
//     &:hover {
//       transform: translateY(-4px);
//       box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
//     }
//   }

//   /* Планшети */
//   @media (min-width: 600px) {
//     max-width: 300px;
//   }

//   /* Ноутбуки */
//   @media (min-width: 992px) {
//     max-width: 320px;
//   }

//   /* Великі монітори */
//   @media (min-width: 1400px) {
//     max-width: 340px;
//   }
// `;

// export const StyledImageLink = styled(Link)`
//   position: relative;
//   display: block;
//   width: 100%;
//   aspect-ratio: 1;
//   overflow: hidden;
// `;

export const StyledCardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 280px;
  margin: 0 auto;

  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  transition: 0.25s ease;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  @media (min-width: 600px) {
    max-width: 300px;
  }

  @media (min-width: 992px) {
    max-width: 320px;
  }

  @media (min-width: 1400px) {
    max-width: 340px;
  }
`;

export const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
`;

export const StyledCertificateImage = styled(Image)`
  object-fit: cover;
  transition: transform 0.3s ease;
`;

export const StyledCardTitle = styled.h3`
  margin: 12px 16px 6px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;

export const StyledCardCount = styled.p`
  margin: 0 0 16px;
  text-align: center;
  font-size: 16px;
  color: #666;
`;
