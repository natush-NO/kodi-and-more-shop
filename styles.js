import { createGlobalStyle } from "styled-components";

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
 font-family: 'Lora', serif;
  line-height: 1;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.95);
  color: #000;
  min-height: 100vh; 
  overflow-y: auto;
  overflow-x: hidden;
  height: var(--body-height);
  z-index: 0;
}

// body::after {
//   content: "";
//   position: fixed;
//   top: 0;
//   right: 0;
//   width: 100%;
//   height: 100%;
//   pointer-events: none;
//   background: linear-gradient(
//     to left,
//     rgba(50, 49, 49, 0.153) 0%,
//     rgba(50, 49, 49, 0) 30%
//   );
// }

// body::before {
//   content: "";
//   position: fixed;
//   top: 0;
//   right: 0;
//   width: 100%;
//   height: 100%;
//   pointer-events: none;
//   background: linear-gradient(
//     to right,
//     rgba(50, 49, 49, 0.153) 0%,
//     rgba(50, 49, 49, 0) 30%
//   );
// }


input,
button,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
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
  padding: 10px;
  text-align: center;
  overflow: hidden;
  border-radius: 10px;
  background-color: #ffffff;



  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  
}

li,
button, 
a {
  cursor: pointer;
  transition: color 0.9s ease;
}

@media (hover: hover) {
  li:hover,
  button:hover,
  a:hover {
    color: rgba(0, 0, 255, 0.452);
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
  -webkit-appearance: none;
  -moz-appearance: none;
}

input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

`;
