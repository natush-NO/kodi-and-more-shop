import styled from "styled-components";
import Link from "next/link";

export const StyledSearchOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;

  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);

  display: flex;
  justify-content: center;
  align-items: flex-start;

  padding: 90px 20px 40px;

  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 74px 12px 20px;
  }
`;

export const StyledSearchWindow = styled.div`
  width: 100%;
  max-width: 760px;

  background: #fff;
  border-radius: 16px;

  overflow: hidden;

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    max-width: none;
    border-radius: 14px;
  }
`;

export const StyledSearchHeader = styled.div`
  display: flex;
  align-items: center;

  padding: 14px 16px;

  border-bottom: 1px solid #e5e5e5;
`;

export const StyledSearchInputWrapper = styled.div`
  flex: 1;
`;

export const StyledSearchInput = styled.input`
  width: 100%;

  border: none;
  outline: none;

  background: transparent;

  font-size: 18px;
  line-height: 1.4;

  color: #111;

  &::placeholder {
    color: #999;
  }

  &::-webkit-search-cancel-button {
    display: none;
  }
`;

export const StyledSearchClose = styled.button`
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border: none;
  background: transparent;

  color: #111;

  font-size: 32px;
  font-weight: 300;
  line-height: 1;

  cursor: pointer;

  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.55;
  }
`;

export const StyledSearchResults = styled.div`
  max-height: calc(100vh - 190px);
  overflow-y: auto;
`;

export const StyledSearchResult = styled(Link)`
  display: flex;
  align-items: center;

  gap: 16px;

  padding: 14px 18px;

  color: inherit;
  text-decoration: none;

  border-bottom: 1px solid #eeeeee;

  transition: background 0.2s ease;

  &:hover {
    background: #f7f7f7;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const StyledSearchResultImage = styled.img`
  width: 72px;
  height: 72px;

  flex-shrink: 0;

  object-fit: contain;

  border-radius: 8px;

  background: #f7f7f7;
`;

export const StyledSearchResultInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const StyledSearchResultTitle = styled.h3`
  margin: 0;

  font-size: 16px;
  font-weight: 500;
  line-height: 1.35;

  color: #111;
`;

export const StyledSearchResultPrice = styled.p`
  margin: 0;

  font-size: 16px;
  font-weight: 700;

  color: #111;
`;

export const StyledSearchEmpty = styled.p`
  margin: 0;
  padding: 40px 20px;

  text-align: center;

  color: #777;

  font-size: 16px;
`;
