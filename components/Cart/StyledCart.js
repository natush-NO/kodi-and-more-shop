import styled from "styled-components";

export const StyledCartPage = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 30px 80px;

  @media (max-width: 768px) {
    padding: 30px 18px 60px;
  }
`;

export const StyledCartBackButton = styled.button`
  display: inline-flex;
  align-items: center;

  margin: 0 0 20px;
  padding: 0;

  border: none;
  background: transparent;

  color: #111;
  font-size: 16px;
  font-weight: 500;

  cursor: pointer;

  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.6;
  }
`;

export const StyledCartTitle = styled.h1`
  margin: 0 0 40px;

  font-size: 42px;
  font-weight: 700;
  color: #111;

  @media (max-width: 768px) {
    margin-bottom: 30px;
    font-size: 32px;
  }
`;

export const StyledCartContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 40px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledCartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledCartItem = styled.div`
  display: flex;
  gap: 20px;

  padding: 20px;

  border: 1px solid #e5e5e5;
  border-radius: 12px;

  background: #fff;

  @media (max-width: 600px) {
    gap: 14px;
    padding: 14px;
  }
`;

export const StyledCartItemImage = styled.div`
  position: relative;

  width: 140px;
  height: 170px;

  flex-shrink: 0;

  overflow: hidden;

  border-radius: 8px;

  background: #f5f5f5;

  @media (max-width: 600px) {
    width: 100px;
    height: 130px;
  }
`;

export const StyledCartItemInfo = styled.div`
  min-width: 0;
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StyledCartItemTitle = styled.h2`
  margin: 0 0 8px;

  font-size: 20px;
  font-weight: 600;
  line-height: 1.25;

  color: #111;

  @media (max-width: 600px) {
    font-size: 17px;
  }
`;

export const StyledCartItemArticle = styled.p`
  margin: 0 0 14px;

  font-size: 14px;
  color: #777;
`;

export const StyledCartItemPrice = styled.div`
  margin-bottom: 18px;

  font-size: 18px;
  font-weight: 600;

  color: #111;
`;

export const StyledCartQuantity = styled.div`
  display: flex;
  align-items: center;

  height: 40px;
  margin-bottom: 14px;

  border: 1px solid #dcdcdc;
  border-radius: 8px;

  overflow: hidden;
`;

export const StyledCartQuantityButton = styled.button`
  width: 40px;
  height: 40px;

  padding: 0;

  border: none;

  background: #f7f7f7;
  color: #111;

  font-size: 22px;
  line-height: 1;

  cursor: pointer;

  transition: background 0.2s ease;

  &:hover {
    background: #eaeaea;
  }
`;

export const StyledCartQuantityValue = styled.span`
  min-width: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: 600;

  color: #111;
`;

export const StyledCartRemoveButton = styled.button`
  padding: 0;

  border: none;
  background: transparent;

  color: #e11d48;

  font-size: 14px;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledCartSummary = styled.aside`
  position: sticky;
  top: 30px;

  padding: 25px;

  border: 1px solid #e5e5e5;
  border-radius: 12px;

  background: #fff;

  @media (max-width: 900px) {
    position: static;
  }
`;

export const StyledCartSummaryTitle = styled.h2`
  margin: 0 0 25px;

  font-size: 22px;
  font-weight: 600;

  color: #111;
`;

export const StyledCartSummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;

  font-size: 16px;
  color: #555;
`;

export const StyledCartTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: 20px;

  border-top: 1px solid #e5e5e5;

  font-size: 21px;
  font-weight: 700;

  color: #111;
`;

export const StyledCartCheckoutButton = styled.button`
  width: 100%;

  margin-top: 20px;
  padding: 14px 18px;

  border: none;
  border-radius: 8px;

  background: #111827;
  color: #fff;

  font-size: 16px;
  font-weight: 600;

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background: #e11d48;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const StyledCartClearButton = styled.button`
  width: 100%;

  margin-top: 25px;
  padding: 12px 18px;

  border: 1px solid #ddd;
  border-radius: 8px;

  background: #fff;
  color: #111;

  font-size: 14px;

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }
`;

export const StyledCartEmpty = styled.div`
  min-height: 300px;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  font-size: 20px;
  color: #777;
`;
