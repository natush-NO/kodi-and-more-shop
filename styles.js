import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @font-face {
    font-family: "Manrope";
    src: url("/fonts/Manrope-Variable.ttf") format("truetype");
    font-style: normal;
    font-weight: 400 800;
    font-display: swap;
  }

  @font-face {
    font-family: "Cormorant Garamond";
    src: url("/fonts/CormorantGaramond-Variable.ttf") format("truetype");
    font-style: normal;
    font-weight: 400 700;
    font-display: swap;
  }

  @font-face {
    font-family: "Allura";
    src: url("/fonts/Allura-Regular.ttf") format("truetype");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "Manrope", sans-serif;
  }

  button,
  input,
  textarea,
  select {
    font-family: inherit;
  }
`;
