import styled from "styled-components";

export const StyledFilters = styled.aside`
  width: 260px;
  min-width: 260px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);

  @media (max-width: 992px) {
    width: 100%;
    min-width: 100%;
    margin-bottom: 30px;
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
