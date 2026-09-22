import styled from "styled-components";

export const StyledDeliveryPage = styled.div`
  width: 100%;
  box-sizing: border-box;

  padding: 0 20px 50px;

  display: flex;
  flex-direction: column;
  gap: 42px;

  @media (min-width: 768px) {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 0 60px;
  }
`;

export const StyledDeliverySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const StyledDeliveryTitle = styled.h2`
  margin: 0;

  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
`;

export const StyledDeliveryText = styled.p`
  margin: 0;

  font-size: 17px;
  line-height: 1.6;
  color: #333;
`;

export const StyledDeliveryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin: 0;
  padding-left: 22px;
`;

export const StyledDeliveryItem = styled.li`
  font-size: 17px;
  line-height: 1.5;
  color: #333;
`;
