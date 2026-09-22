import styled from "styled-components";
import Link from "next/link";

export const StyledProductPage = styled.main`
  width: 100%;
  box-sizing: border-box;
  padding: 24px 20px 60px;
`;

export const StyledProductBack = styled(Link)`
  display: inline-block;

  margin-bottom: 30px;

  color: #111;
  text-decoration: none;

  font-size: 15px;

  &:hover {
    opacity: 0.6;
  }
`;

export const StyledProductContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  @media (min-width: 768px) {
    grid-template-columns: minmax(0, 1fr) minmax(360px, 0.8fr);
    gap: 70px;
    align-items: start;
  }
`;

export const StyledProductGallery = styled.div`
  width: 100%;
`;

export const StyledProductMainImage = styled.div`
  position: relative;

  width: 100%;
  aspect-ratio: 1 / 1;

  background: #fafafa;

  overflow: hidden;

  img {
    object-fit: contain;
  }
`;

export const StyledProductInfo = styled.div`
  display: flex;
  flex-direction: column;

  padding: 5px 0;
`;

export const StyledProductBrand = styled.p`
  margin: 0 0 10px;

  color: #777;

  font-size: 13px;
  font-weight: 500;

  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const StyledProductTitle = styled.h1`
  margin: 0 0 12px;

  color: #111;

  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;

  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

export const StyledProductArticle = styled.p`
  margin: 0 0 30px;

  color: #888;

  font-size: 14px;
`;

export const StyledProductDetails = styled.div`
  display: flex;
  flex-direction: column;

  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
`;

export const StyledProductDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  padding: 14px 0;

  font-size: 15px;

  &:not(:last-child) {
    border-bottom: 1px solid #eeeeee;
  }

  span:first-child {
    color: #777;
  }

  span:last-child {
    color: #111;
    text-align: right;
  }
`;

export const StyledProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  margin: 28px 0;

  color: #111;

  font-size: 28px;
  font-weight: 700;
`;

export const StyledProductOldPrice = styled.span`
  color: #999;

  font-size: 18px;
  font-weight: 400;

  text-decoration: line-through;
`;

export const StyledProductActions = styled.div`
  display: flex;
  gap: 12px;

  align-items: stretch;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const StyledQuantity = styled.div`
  display: flex;

  min-width: 120px;

  border: 1px solid #111;
`;

export const StyledQuantityButton = styled.button`
  width: 38px;

  border: none;
  background: transparent;

  color: #111;

  font-size: 22px;

  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

export const StyledQuantityValue = styled.span`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
`;

export const StyledFavoriteButton = styled.button`
  align-self: flex-start;

  margin-top: 20px;

  padding: 0;

  border: none;
  background: transparent;

  color: #111;

  font-size: 15px;

  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

export const StyledProductNotFound = styled.div`
  min-height: 50vh;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 20px;

  text-align: center;

  h1 {
    margin: 0;
  }

  a {
    color: #111;
  }
`;
