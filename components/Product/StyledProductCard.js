import styled from "styled-components";

export const StyledProductCard = styled.li`
  display: flex;
  flex-direction: column;

  background: #fff;

  border-radius: 12px;

  overflow: hidden;

  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07);

  transition: 0.25s;

  &:hover {
    transform: translateY(-3px);

    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

export const StyledProductBadges = styled.div`
  display: flex;

  gap: 6px;

  padding: 10px 12px 0;
`;

export const StyledBadge = styled.span`
  padding: 3px 8px;

  border-radius: 5px;

  background: #e91e63;

  color: white;

  font-size: 11px;

  font-weight: 600;
`;

export const StyledProductImageWrapper = styled.div`
  position: relative;

  width: 100%;

  height: 220px;

  padding: 12px;
`;

export const StyledProductInfo = styled.div`
  display: flex;

  flex-direction: column;

  flex: 1;

  padding: 14px;
`;

export const StyledProductTitle = styled.h3`
  font-size: 16px;

  font-weight: 600;

  line-height: 1.3;

  height: 42px;

  overflow: hidden;

  margin: 0 0 8px;
`;

export const StyledProductArticle = styled.p`
  color: #888;

  font-size: 13px;

  margin: 0 0 14px;
`;

export const StyledProductBottom = styled.div`
  margin-top: auto;
`;

export const StyledProductPrice = styled.p`
  font-size: 22px;

  font-weight: 700;

  margin: 0 0 12px;
`;

export const StyledFavoriteButton = styled.button`
  position: absolute;

  top: 10px;

  right: 10px;

  z-index: 5;

  width: 34px;

  height: 34px;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 0;

  border: none;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.9);

  cursor: pointer;

  font-size: 21px;

  line-height: 1;

  color: #e8a0a8;

  transition:
    color 0.2s ease,
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    color: #dc7f89;

    transform: scale(1.05);

    background: rgba(255, 255, 255, 0.98);
  }
`;
