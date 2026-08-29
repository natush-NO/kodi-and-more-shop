import styled from "styled-components";
import Link from "next/link";

export const StyledBreadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  padding: 18px 20px;

  background: #111;
`;

export const StyledBreadcrumbLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;

  font-size: 15px;
  font-weight: 500;

  transition: color 0.25s;

  &:hover {
    color: #fff;
  }
`;

export const StyledBreadcrumbCurrent = styled.span`
  color: #fff;

  font-size: 15px;
  font-weight: 600;
`;

export const StyledBreadcrumbSeparator = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  color: rgba(255, 255, 255, 0.45);

  svg {
    width: 15px;
    height: 15px;
  }
`;
