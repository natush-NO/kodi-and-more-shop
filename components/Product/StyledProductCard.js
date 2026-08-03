import styled from "styled-components";

export const StyledProductCard = styled.li`
  display: flex;
  flex-direction: column;

  background: #fff;

  border-radius: 14px;

  overflow: hidden;

  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);

  transition: 0.25s;

  &:hover {
    transform: translateY(-5px);

    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }
`;

export const StyledProductBadges = styled.div`
  display: flex;

  gap: 8px;

  padding: 15px 15px 0;
`;

export const StyledBadge = styled.span`
  padding: 4px 10px;

  border-radius: 5px;

  background: #e91e63;

  color: white;

  font-size: 12px;

  font-weight: 600;
`;

export const StyledProductImageWrapper = styled.div`
  position: relative;

  width: 100%;

  height: 300px;

  padding: 20px;
`;

export const StyledProductInfo = styled.div`
  display: flex;

  flex-direction: column;

  flex: 1;

  padding: 20px;
`;

export const StyledProductTitle = styled.h3`
  font-size: 18px;

  font-weight: 600;

  line-height: 1.4;

  height: 52px;

  overflow: hidden;

  margin-bottom: 10px;
`;

export const StyledProductArticle = styled.p`
  color: #888;

  font-size: 14px;

  margin-bottom: 20px;
`;

export const StyledProductBottom = styled.div`
  margin-top: auto;
`;

export const StyledProductPrice = styled.p`
  font-size: 28px;

  font-weight: 700;

  margin-bottom: 18px;
`;
