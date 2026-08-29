import styled from "styled-components";

export const StyledCheckoutPage = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 30px 80px;

  @media (max-width: 768px) {
    padding: 30px 18px 60px;
  }
`;

export const StyledCheckoutBackButton = styled.button`
  margin-bottom: 25px;

  padding: 0;

  border: none;
  background: transparent;

  color: #555;

  font-size: 15px;
  cursor: pointer;

  transition: color 0.2s ease;

  &:hover {
    color: #111;
  }
`;

export const StyledCheckoutTitle = styled.h1`
  margin: 0 0 40px;

  font-size: 42px;
  font-weight: 700;
  color: #111;

  @media (max-width: 768px) {
    margin-bottom: 30px;
    font-size: 32px;
  }
`;

export const StyledCheckoutContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 40px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledCheckoutForm = styled.form`
  padding: 30px;

  border: 1px solid #e5e5e5;
  border-radius: 12px;

  background: #fff;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

export const StyledCheckoutFormTitle = styled.h2`
  margin: 0 0 30px;

  font-size: 24px;
  font-weight: 600;
  color: #111;
`;

export const StyledCheckoutField = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 20px;
`;

export const StyledCheckoutLabel = styled.label`
  margin-bottom: 8px;

  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const StyledCheckoutInput = styled.input`
  width: 100%;

  padding: 13px 14px;

  border: 1px solid #dcdcdc;
  border-radius: 8px;

  background: #fff;

  color: #111;
  font-size: 16px;

  outline: none;

  transition: border-color 0.2s ease;

  &:focus {
    border-color: #111;
  }

  &::placeholder {
    color: #999;
  }
`;

export const StyledCheckoutTextarea = styled.textarea`
  width: 100%;

  padding: 13px 14px;

  border: 1px solid #dcdcdc;
  border-radius: 8px;

  background: #fff;

  color: #111;
  font-family: inherit;
  font-size: 16px;

  resize: vertical;

  outline: none;

  transition: border-color 0.2s ease;

  &:focus {
    border-color: #111;
  }

  &::placeholder {
    color: #999;
  }
`;

export const StyledCheckoutOrder = styled.aside`
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

export const StyledCheckoutOrderTitle = styled.h2`
  margin: 0 0 25px;

  font-size: 22px;
  font-weight: 600;
  color: #111;
`;

export const StyledCheckoutItems = styled.div`
  display: flex;
  flex-direction: column;

  gap: 18px;
`;

export const StyledCheckoutItem = styled.div`
  display: flex;

  gap: 14px;

  padding-bottom: 18px;

  border-bottom: 1px solid #eee;
`;

export const StyledCheckoutItemImage = styled.div`
  position: relative;

  width: 80px;
  height: 100px;

  flex-shrink: 0;

  overflow: hidden;

  border-radius: 8px;

  background: #f5f5f5;
`;

export const StyledCheckoutItemInfo = styled.div`
  min-width: 0;

  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledCheckoutItemName = styled.h3`
  margin: 0 0 8px;

  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;

  color: #111;
`;

export const StyledCheckoutItemDetails = styled.div`
  margin-bottom: 8px;

  font-size: 14px;
  color: #777;
`;

export const StyledCheckoutItemTotal = styled.div`
  font-size: 16px;
  font-weight: 600;

  color: #111;
`;

export const StyledCheckoutSummary = styled.div`
  margin-top: 25px;
`;

export const StyledCheckoutSummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;

  font-size: 16px;
  color: #555;
`;

export const StyledCheckoutTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: 20px;

  border-top: 1px solid #e5e5e5;

  font-size: 21px;
  font-weight: 700;

  color: #111;
`;

export const StyledCheckoutSubmitButton = styled.button`
  width: 100%;

  margin-top: 10px;

  padding: 14px 20px;

  border: none;
  border-radius: 8px;

  background: ${({ $submitted }) => ($submitted ? "#9ca3af" : "#e11d48")};

  color: #fff;

  font-size: 16px;
  font-weight: 600;

  cursor: ${({ $submitted }) => ($submitted ? "default" : "pointer")};

  transition: all 0.2s ease;

  &:hover {
    background: ${({ $submitted }) => ($submitted ? "#9ca3af" : "#be123c")};
  }

  &:active {
    transform: ${({ $submitted }) => ($submitted ? "none" : "translateY(1px)")};
  }

  &:disabled {
    cursor: ${({ $submitted }) => ($submitted ? "default" : "not-allowed")};

    opacity: ${({ $submitted }) => ($submitted ? 1 : 0.7)};
  }
`;

export const StyledCheckoutEmpty = styled.div`
  min-height: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  font-size: 20px;
  color: #777;

  ${StyledCheckoutSubmitButton} {
    width: auto;
    min-width: 220px;
    margin-top: 20px;
  }
`;
