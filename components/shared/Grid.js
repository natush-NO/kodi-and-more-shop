import styled from "styled-components";

export const Grid = styled.ul`
  width: 100%;

  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(280px, 320px));

  justify-content: center;

  gap: 30px;

  list-style: none;

  padding: 0;
`;
