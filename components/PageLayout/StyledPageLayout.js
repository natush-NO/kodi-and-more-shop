import styled from "styled-components";

export const StyledMain = styled.main`
  width: 100%;
`;

export const StyledMainContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 50px;
  box-sizing: border-box;
`;

export const StyledContentHeader = styled.div`
  width: 400px;

  margin: 0 0 24px;

  text-align: left;
`;

export const StyledContentTitle = styled.h1`
  margin: 0;

  font-family: "Cormorant Garamond", serif;

  font-size: 38px;
  font-weight: 500;
  line-height: 0.95;
  letter-spacing: -0.5px;

  color: #111;
`;

export const StyledContentTitleAccent = styled.span`
  display: block;

  font-family: "Cormorant Garamond", serif;
  font-weight: 500;

  color: #b79d92;
`;

export const StyledContentSubtitle = styled.p`
  margin: 14px 0 0;

  font-family: "Manrope", sans-serif;

  font-size: 18px;
  font-weight: 400;
  line-height: 1.3;

  color: #111;
`;

export const StyledPageTitle = styled.h1`
  margin-bottom: 25px;
  text-align: center;
  font-size: 24px;

  @media (min-width: 768px) {
    font-size: 30px;
  }
`;
