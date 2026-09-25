import styled from "styled-components";
import Link from "next/link";

export const StyledBrandMarquee = styled.div`
  width: 100%;
  height: 58px;

  display: flex;
  align-items: center;

  overflow: hidden;

  background: #f8f5f2;

  border-top: 1px solid rgba(23, 22, 21, 0.1);
  border-bottom: 1px solid rgba(23, 22, 21, 0.1);
`;

export const StyledBrandTrack = styled.div`
  display: flex;
  align-items: center;

  width: max-content;

  animation: brandScroll 90s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @keyframes brandScroll {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-50%);
    }
  }
`;

export const StyledBrandItem = styled.div`
  display: flex;
  align-items: center;

  flex-shrink: 0;
`;

export const StyledBrandLink = styled(Link)`
  display: block;

  padding: 0 24px;

  color: #171615;

  font-family: "Manrope", sans-serif;
  font-size: 14px;
  font-weight: 500;

  letter-spacing: 1.5px;
  text-transform: uppercase;

  text-decoration: none;

  white-space: nowrap;

  transition:
    color 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    color: #b79d92;
  }
`;

export const StyledBrandSeparator = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #b79d92;

  font-size: 10px;
`;
