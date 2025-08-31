import styled, { css } from "styled-components";
import Link from "next/link";

const sharedFlexStyles = css`
  display: flex;
`;

const borderRadiusStyles = css`
  border-radius: 10px;
`;

export const StyledCatalogMenuWrapper = styled.div`
  width: 300px;
  ${sharedFlexStyles};
  ${borderRadiusStyles};
  flex-direction: column;
  gap: 20px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50px;
  left: 31%;
  transform: translateX(-50%);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  z-index: 11;
  overflow: hidden;
  padding: 10px;
`;

export const StyledCatalogMenuList = styled.ul`
  ${sharedFlexStyles};
  align-items: center;
  justify-content: center;
  width: 90px;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
`;

export const StyledCatalogMenuListItem = styled.li`
  width: 150px;
  ${sharedFlexStyles};
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
`;

export const StyledCatalogMenuLink = styled(Link)``;

export const StyledCatalogMenuBackLink = styled(Link)`
  display: block;
`;
