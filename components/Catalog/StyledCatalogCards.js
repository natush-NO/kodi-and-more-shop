import styled from "styled-components";
import Link from "next/link";

export const StyledCatalogSection = styled.section`
  width: 100%;
  max-width: 1400px;

  margin: 0 auto;
  padding-bottom: 40px;

  box-sizing: border-box;
`;

export const StyledCatalogGrid = styled.ul`
  width: 100%;

  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 20px;

  margin: 0;
  padding: 0;

  list-style: none;
`;

export const StyledCatalogCard = styled.li`
  width: 100%;
  min-width: 0;
`;

export const StyledCardLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  width: 100%;
  max-width: 350px;

  height: 120px;

  padding: 12px 14px 12px 24px;

  box-sizing: border-box;

  color: #171615;
  text-decoration: none;

  background: rgba(255, 255, 255, 0.72);

  border: 1px solid rgba(80, 60, 50, 0.12);
  border-radius: 12px;

  overflow: hidden;

  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.92);

    transform: translateY(-2px);

    box-shadow: 0 8px 25px rgba(70, 45, 35, 0.08);
  }

  @media (max-width: 768px) {
    gap: 14px;

    min-height: 90px;

    padding: 8px 10px 8px 12px;

    border-radius: 10px;
  }
`;

export const StyledCardImage = styled.img`
  width: 82px;
  height: 72px;

  flex-shrink: 0;

  display: block;

  object-fit: cover;

  border-radius: 8px;
`;

export const StyledCardTitle = styled.h2`
  margin: 0;

  color: #171615;

  font-family: "Manrope", sans-serif;

  font-size: clamp(18px, 2vw, 25px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.3px;

  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

export const StyledCardArrow = styled.span`
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  border: 1px solid rgba(120, 80, 60, 0.35);
  border-radius: 50%;

  color: #171615;

  font-size: 20px;
  line-height: 1;

  transition:
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;

  ${StyledCardLink}:hover & {
    background: #171615;
    color: #fff;

    transform: translateX(2px);
  }

  @media (max-width: 768px) {
    width: 34px;
    height: 34px;

    font-size: 17px;
  }
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

  background: transparent;

  @media (max-width: 992px) {
    display: flex;
    justify-content: center;

    width: 100%;
  }
`;

export const StyledCatalogPage = styled.div`
  min-height: 100vh;

  color: #171615;

  background: transparent;
`;
