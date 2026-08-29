import styled from "styled-components";

export const StyledFilters = styled.aside`
  width: 260px;
  min-width: 260px;

  padding: 20px;

  color: #111;

  border-radius: 10px;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);

  @media (max-width: 992px) {
    ${({ $mobile }) =>
      $mobile
        ? `
      width: 100%;
      min-width: 100%;
      color: #fff;
      
      display: block;
      box-shadow: none;
      border-radius: 0;
      padding: 20px;
    `
        : `
      display: none;
    `}
  }
`;

export const StyledFilterBlock = styled.div`
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;

export const StyledFilterTitle = styled.h3`
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
`;

export const StyledFilterList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const StyledFilterItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;
    gap: 10px;
  }
`;

export const StyledCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const StyledColor = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #ccc;
  display: inline-block;
`;

export const StyledCatalogLayout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 30px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const StyledProducts = styled.div`
  flex: 1;
`;

export const StyledFilterOverlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.45);

  z-index: 998;
`;

export const StyledMobileFilters = styled.div`
  position: fixed;

  top: 0;
  left: 0;

  width: 340px;
  max-width: 92vw;
  height: 100vh;

  background: #000;

  overflow-y: auto;

  z-index: 999;

  margin-top: 50px;
  animation: slideIn 0.28s ease;

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }

    to {
      transform: translateX(0);
    }
  }
`;

export const StyledMobileFiltersHeader = styled.div`
  position: sticky;

  top: 0;

  background: #000;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 22px 20px;

  border-bottom: 1px solid #ececec;

  h2 {
    font-size: 24px;
    font-weight: 700;
  }
`;

// export const StyledCloseButton = styled.button`
//   background: transparent;
//   border: none;

//   font-size: 34px;

//   cursor: pointer;
// `;

export const StyledFilterButtonWrapper = styled.div`
  width: 100%;
  background: #111;

  padding: 12px 20px;

  @media (min-width: 993px) {
    display: none;
  }
`;

export const StyledCloseButton = styled.button`
  width: 44px;
  height: 44px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: transparent;
  border: none;

  cursor: pointer;

  svg {
    width: 30px;
    height: 30px;
    color: #111;
    stroke-width: 2;
  }

  &:hover {
    opacity: 0.7;
  }
`;

export const StyledOpenFiltersButton = styled.button`
  display: none;

  @media (max-width: 992px) {
    display: flex;

    align-items: center;
    gap: 10px;

    background: #000;
    color: white;

    padding: 16px 28px;

    border-radius: 999px;

    font-size: 18px;
    font-weight: 600;

    svg {
      width: 22px;
      height: 22px;
    }
  }
`;
