import { styled } from "styled-components";

export const StyledBackgroundImgBody = styled.div`
  width: 100vw;
  height: 100vh;

  &::after {
    content: "";
    display: block;
    // background-image: url("/background/background.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -2;
  }
`;
