import { createGlobalStyle } from "styled-components";

import "@fontsource/arima";

export default createGlobalStyle`

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  border: none;
  box-sizing: border-box;
}

*::before,
*::after {
  display: inline-block;
}

a {
  text-decoration: none;
  color: inherit;
  display: inline-block;
  border-radius: 10px;
}

li {
  list-style: none;
}

img {
  vertical-align: top;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: inherit;
  font-size: inherit;
}

html {
  font-size: 10px;
}
  
body {
  font-family: 'Arima', sans-serif;
  line-height: 1;
  font-weight: 600;
background-color: rgba(255, 255, 255, 0.95);


  // background-image: url("/background/background.jpg");
  // background-size: cover;
  // background-position: center;
  // background-repeat: no-repeat;
  color: #000;
  min-height: 100vw;
  overflow-y: auto;
  height: var(--body-height);
  overflow-x: hidden;

// &::after {
//   content: ""; 
//   position: fixed; 
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #ffffff;
//   z-index: -1; 
//   }
}

input,
button,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}

input,
textarea {
  width: 100%;
  background-color: transparent;
}

label {
  display: inline-block;
}

button {
  cursor: pointer;
  padding: 10px;
  text-align: center;
  overflow: hidden;
  background-color: #ffffff;

  // border-radius: 10px;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  // transition: color 0.6s ease-in-out;

  @media (hover: hover) {
    &:hover {
  transition: color 0.9s ease;
    color: rgba(0, 0, 255, 0.452);
    }
  }
}

select,
option {
  cursor: pointer;
}

input[type="text"],
input[type="email"],
input[type="tel"],
textarea {
  appearance: none;
}

input[type="number"] {
  appearance: textfield; 
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: auto; 
  }

  &::-moz-appearance {
    appearance: auto; 
  }
`;
