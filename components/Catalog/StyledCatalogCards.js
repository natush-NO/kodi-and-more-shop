import styled from "styled-components";
import Link from "next/link";

export const StyledCatalogGrid = styled.ul`
  width: 100%;

  display: flex;
  flex-direction: column;

  margin: 0;
  padding: 0;

  list-style: none;
`;

export const StyledCatalogCard = styled.li`
  width: 100%;

  border-bottom: 1px solid #e5e5e5;
`;

export const StyledCardLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 18px 0;

  color: inherit;
  text-decoration: none;

  font-size: 18px;
  font-weight: 500;

  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.65;
  }

  &::after {
    content: "→";

    font-size: 20px;
    flex-shrink: 0;
  }
`;

export const StyledCardTitle = styled.h2`
  margin: 0;

  font-size: 18px;
  font-weight: 500;
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
  width: 100%;
  flex: 1;
  background: #fff;

  @media (max-width: 992px) {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

export const StyledCatalogPage = styled.div`
  color: #fff;
  min-height: 100vh;
`;

export const StyledCatalogHeader = styled.div`
  width: 100%;

  background: #111;
  color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 30px 20px;
    margin-bottom: 25px;
  }
`;

export const StyledCatalogTitle = styled.h1`
  margin: 0 0 12px;

  font-size: clamp(42px, 6vw, 72px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -1px;

  color: #fff;
`;

export const StyledCatalogSubtitle = styled.p`
  margin: 0;

  font-size: clamp(18px, 2vw, 28px);
  font-weight: 400;
  line-height: 1.4;

  color: rgba(255, 255, 255, 0.85);
`;
