import styled from "styled-components";

export const Grid = styled.ul`
  width: 100%;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  justify-content: center;

  gap: 12px;

  margin: 0;
  padding: 0 10px;

  list-style: none;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 250px));

    gap: 20px;

    padding: 0;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 250px));

    gap: 24px;
  }

  @media (min-width: 1500px) {
    grid-template-columns: repeat(5, minmax(0, 250px));
  }
`;
