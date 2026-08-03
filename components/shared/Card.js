import styled from "styled-components";

export const Card = styled.li`
  width: 280px;

  background: #fff;

  border-radius: 10px;

  overflow: hidden;

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);

  transition: 0.25s;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const CardImageWrapper = styled.div`
  position: relative;

  width: 100%;

  height: 320px;

  padding: 20px;
`;
