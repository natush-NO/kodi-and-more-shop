import styled from "styled-components";

export const StyledFavoritesPage = styled.main`
  width: 100%;
  padding: 50px 40px 80px;

  @media (max-width: 992px) {
    padding: 40px 24px 60px;
  }

  @media (max-width: 600px) {
    padding: 30px 16px 50px;
  }
`;

export const StyledFavoritesHeader = styled.div`
  margin-bottom: 40px;
`;

export const StyledFavoritesBack = styled.button`
  display: inline-flex;
  align-items: center;

  margin-bottom: 28px;
  padding: 0;

  background: transparent;
  border: none;

  color: #111;
  font-size: 16px;

  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

export const StyledFavoritesTitle = styled.h1`
  margin: 0;

  color: #111;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.1;

  @media (max-width: 600px) {
    font-size: 36px;
  }
`;

export const StyledFavoritesGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 28px;

  width: 100%;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const StyledFavoritesEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 24px;

  padding: 60px 0;
`;

export const StyledFavoritesEmptyText = styled.p`
  margin: 0;

  color: #111;
  font-size: 22px;
`;

export const StyledFavoritesCatalogButton = styled.button`
  padding: 14px 24px;

  background: #111;
  border: none;
  border-radius: 8px;

  color: #fff;
  font-size: 16px;
  font-weight: 500;

  cursor: pointer;

  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;
