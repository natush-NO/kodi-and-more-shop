import styled, { css } from "styled-components";
import Link from "next/link";

const sharedContainerStyles = css`
  margin: 0 auto;
`;

const sharedFlexStyles = css`
  display: flex;
`;

const sharedMarginBottom = css`
  margin-bottom: 50px;
`;

export const StyledStickyTopBar = styled.div`
  border-top: 5px solid rgba(255, 0, 0, 0.795);
position: sticky;
top: 0;
z-index: 1000; 
  }
`;

export const StyledHeader = styled.header`
  min-height: 100px;
  padding-top: 20px;
  margin-bottom: 30px;

  @media (min-width: 1000px) {
    margin-bottom: 50px;
  }
`;

export const StyledBottomHeader = styled.div`
  border-bottom: 1px solid #e0e0e0;
`;

export const StyledLanguageBox = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-weight: bold;
  color: #333;
`;

export const StyledLanguageButton = styled.button`
  background-color: #ffffff;

  border-radius: 10px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
  transition: color 0.6s ease-in;

  @media (hover: hover) {
    &:hover {
      transition: color 0.9s ease;
      color: rgba(0, 0, 255, 0.452);
    }
  }
`;

export const StyledHeaderInfoBar = styled.div`
  ${sharedFlexStyles};
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 50px;
  position: relative;
`;

export const StyledOpeningHours = styled.div`
  width: 300px;
  ${sharedContainerStyles};
  font-weight: 400;
  font-size: 16px;

  @media (min-width: 1000px) {
    max-width: 400px;
    margin: 0 !important;
  }
`;

export const StyledOpeningHoursSpan = styled.span``;

export const StyledBrandName = styled.div`
  font-size: 45px;
  text-align: center;
  letter-spacing: 2px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);

  @media (min-width: 800px) {
    font-size: 52px;
  }

  @media (min-width: 1200px) {
    font-size: 72px;
  }
`;

export const StyledBrandNameSpan = styled.span`
  font-size: 24px;
`;

export const StyledOpeningHoursTitel = styled.div`
  margin-bottom: 5px;
  font-weight: 600;
`;

export const StyledNavHeader = styled.nav`
  ${sharedContainerStyles};
  ${sharedFlexStyles};
  justify-content: space-between;
  padding-bottom: 25px;
  gab: 10px;
`;

export const StyledButtonMenu = styled.button`
  min-width: 100px;
  font-size: 18px;
  padding: 15px 0;
  ${sharedMarginBottom};

  @media (min-width: 500px) {
    padding: 5px;
    font-size: 22px;
  }
`;

export const StyledNavItems = styled.ul`
  font-size: 14px;
  max-width: 350px;
  ${sharedFlexStyles};
  flex-direction: column;
  gap: 15px;
  flex-wrap: wrap;
  align-items: center;

  text-alighn: center;
  ${sharedContainerStyles};
  ${sharedMarginBottom};

  @media (min-width: 500px) {
    max-width: 450px;
    font-size: 18px;
    flex-direction: row;
    justify-content: space-between;
    gap: 5px;
  }

  @media (min-width: 650px) {
    max-width: 500px;
  }

  @media (min-width: 1000px) {
    width: 700px;
    font-size: 18px;
    justify-content: flex-start;
    margin: 0 !important;
    gap: 20px;
  }
`;

export const StyledNavItem = styled.li``;

export const StyledNavButton = styled.button`
  background-color: #ffffff;

  border-radius: 10px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
  transition: color 0.6s ease-in;
`;

export const StyledSocialItems = styled.ul`
  // max-width: 250px;
  ${sharedFlexStyles};
  gap: 15px;
  flex-wrap: wrap;
  ${sharedContainerStyles};

  @media (min-width: 1000px) {
    width: 300px;
    justify-content: flex-end;
    margin: 0 !important;
  }
`;

export const StyledSocialItem = styled.li`
  ${sharedContainerStyles};
`;

export const StyledSocialLink = styled(Link)`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #ffffff;

  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  transition: color 0.6s ease-in;

  @media (min-width: 600px) {
    width: 50px;
    height: 50px;
  }

  @media (min-width: 1000px) {
    width: 35px;
    height: 35px;
  }

  @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 255, 0.452);
      transition: color 0.9s ease;
    }
  }
`;

export const StyledPhoneLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      transition: color 0.9s ease;
      color: rgba(0, 0, 255, 0.452);
    }
  }
`;

export const StyledSearchBocks = styled.div`
  position: relative;
`;

export const StyledSearchInput = styled.input`
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  width: 100%;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.95);
  color: #333;

  &:focus {
    border-color: #888;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  }
`;

export const StyledFaSearch = styled.div`
  position: absolute;
  right: 5px;
  top: 40%;
  transform: translateY(-50%);
`;

export const StyledIconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  width: 20px;
  height: 20px;
  opacity: 0.6;
`;

export const StylednavigationMenu = styled.nav`
  height: 50px;
  border: 1px solid #e0e0e0;
`;

export const StyledNavigationMenu__List = styled.ul`
  ${sharedFlexStyles};
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  font-size: 16px;
`;

export const StyledNavigationMenu__Item = styled.li``;

export const StyledNavigationMenu__Link = styled.a`
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 255, 0.452);
      transition: color 0.9s ease;
    }
  }
`;

export const StyledNavigationMenu = styled.div`
  background-color: #000;
  color: #fff; /* додай, щоб текст був видимий */
  padding: 5px;
  border-radius: 10px;
`;
