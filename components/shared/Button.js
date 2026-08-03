import styled from "styled-components";

export const Button = styled.button`
  width: 100%;

  padding: 14px 20px;

  border: none;

  border-radius: 10px;

  background: #111827;

  color: #ffffff;

  font-size: 16px;

  font-weight: 600;

  cursor: pointer;

  transition: all 0.25s ease;

  &:hover {
    background: #e11d48;

    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #d1d5db;

    color: #6b7280;

    cursor: not-allowed;

    transform: none;
  }
`;
