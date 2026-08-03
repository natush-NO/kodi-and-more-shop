import styled from "styled-components";

export const StyledMain = styled.main`
  width: 100%;
`;

export const StyledMainContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 25px;
`;

export const StyledPageTitle = styled.h1`
  margin-bottom: 25px;
  text-align: center;
  font-size: 24px;

  @media (min-width: 768px) {
    font-size: 30px;
  }
`;
