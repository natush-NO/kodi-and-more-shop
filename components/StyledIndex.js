import styled from "styled-components";

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

export const StyledTitleHello = styled.h1`
  width: 100%;
  font-size: 66px;
  line-height: 1.2;

  @media (min-width: 600px) {
    font-size: 76px;
  }

  @media (min-width: 1000px) {
    font-size: 84px;
  }
`;

export const StyledTitleWelcome = styled.h2`
  font-size: 44px;
  margin-top: 30px;
  letter-spacing: 2px;

  @media (min-width: 800px) {
    font-size: 52px;
  }

  @media (min-width: 1200px) {
    font-size: 72px;
  }
`;

export const StyledTextArticle = styled.article`
  position: relative;
  background-color: rgb(19, 81, 108);
  padding: 30px;
  border-radius: 10px;
  font-size: 22px;
  margin-top: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

  @media (min-width: 800px) {
    font-size: 28px;
  }

  @media (min-width: 1200px) {
    font-size: 32px;
  }
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 36px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 7px 3px 0 3px;

  @media (hover: hover) {
    &:hover {
      opacity: 0.3;
    }
  }

  @media (min-width: 500px) {
    font-size: 44px;
  }
`;

export const StyledTextAboutMe = styled.p`
  line-height: 1.5;
  letter-spacing: 1px;
  font-weight: 400;
`;

export const StyledSpan = styled.span`
  font-weight: 600;
`;
