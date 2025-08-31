import styled from "styled-components";
import Link from "next/link";

export const StyledMain = styled.main`
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`;

export const StyledMainContainer = styled.div`
  width: 85%;
  padding: 0 25px;
  text-align: center;
  margin: 0 auto;
`;

export const StyledBrandsTitle = styled.h1`
  width: 100%;
  font-size: 66px;
  line-height: 1.2;
  margin-bottom: 30px;

  @media (min-width: 600px) {
    font-size: 76px;
  }

  @media (min-width: 1000px) {
    font-size: 32px;
  }
`;

export const StyledBrandsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

export const StyledBrandItem = styled.li`
  height: 400px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background-color: #fff;
  }
`;

export const StyledBrandLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  transition: color 0.3s ease;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: #595959;
    text-decoration: underline;
  }
`;
