import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

export const Card = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 1rem;
  }
`;

export const Subtitle = styled.p`
  color: #555;
  font-size: 0.9rem;
  margin: 0.5rem 0 1rem;
`;

export const Price = styled.p`
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

export const Button = styled(Link)`
  display: inline-block;
  padding: 0.6rem 1rem;
  background: #8c52ff;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
`;
export const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0 40px;
`;

export const LoadMoreButton = styled.button`
  padding: 10px 24px;
  border-radius: 6px;
  border: 1px solid #d11b1b;
  background-color: #ffffff;
  color: #d11b1b;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease,
    transform 0.1s ease;

  &:hover {
    background-color: #d11b1b;
    color: #ffffff;
    box-shadow: 0 4px 10px rgba(209, 27, 27, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(209, 27, 27, 0.2);
  }
`;
