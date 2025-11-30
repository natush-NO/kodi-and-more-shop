import styled from "styled-components";
import Link from "next/link";

export const Container = styled.main`
  padding: 2rem;
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
