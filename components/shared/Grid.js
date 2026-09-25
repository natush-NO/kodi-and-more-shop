import styled from "styled-components";

export const Grid = styled.ul`
  width: 100%;
  box-sizing: border-box;

  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

  gap: 14px;

  margin: 0;
  padding: 0;

  list-style: none;
`;
