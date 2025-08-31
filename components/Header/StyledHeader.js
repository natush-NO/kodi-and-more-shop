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

const borderRadiusStyles = css`
  border-radius: 10px;
`;

export const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 9;
`;

export const StyledTopStickyBar = styled.div`
  border-top: 8px solid rgba(255, 0, 0, 0.795);
  position: sticky;
  top: 0;
  z-index: 1000;
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

export const StyledLanguageSelector = styled.div`
  ${sharedFlexStyles};
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
  position: relative;
  font-size: 14px;
`;

export const StyledLanguageSelectorOpen = styled.div`
  ${sharedFlexStyles};
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  position: absolute;
  top: 30px;
  left: 0;
  background-color: #ffffff;
  padding: 10px;
  ${borderRadiusStyles};
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

export const StyledLanguageButtonOpen = styled.button`
  padding: 5px 10px;

  ${sharedFlexStyles};
  align-items: center;

  &::before {
    content: "";
    display: inline-block;
    width: 15px;
    height: 10px;
    background-image: ${({ $flag }) => `url("/flags/${$flag}.png")`};
    background-size: cover;
    background-position: center;
    margin-right: 3px;
    border-radius: 2px;
    flex-shrink: 0;
  }
`;

export const StyledLanguageButtonClose = styled.button`
  padding: 5px 10px;

  ${sharedFlexStyles};
  align-items: center;

  &::before {
    content: "";
    display: inline-block;
    width: 15px;
    height: 10px;
    background-image: ${({ $flag }) => `url("/flags/${$flag}.png")`};
    background-size: cover;
    background-position: center;
    margin-right: 5px;
    border-radius: 2px;
    flex-shrink: 0;
  }
`;

export const StyledSearchUserContainer = styled.div`
  ${sharedFlexStyles};
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 300px;
`;

export const StyledUserMenuContainer = styled.div`
  ${sharedFlexStyles};
  justify-content: space-between;
  gap: 25px;
  max-width: 80%;
`;

const BaseIconWrapper = styled.div`
  color: #333333;
  cursor: pointer;
  transition: color 0.9s ease;

  &:hover {
    color: #595959;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const StyledUserIconWrapper = BaseIconWrapper;
export const StyledFavoritesIconWrapper = BaseIconWrapper;
export const StyledCartIconWrapper = BaseIconWrapper;

export const StyledSearchContainer = styled.div`
  position: relative;
`;

export const StyledSearchField = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  width: 300px;
  background-color: rgba(255, 255, 255, 0.95);

  &:focus {
    border-color: #888;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  }
`;

export const StyledSearchIconWrapper = styled.div`
  position: absolute;
  right: 5px;
  top: 45%;
  transform: translateY(-50%);
`;

export const StyledHeaderInfoBar = styled.div`
  ${sharedFlexStyles};
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 50px;
  position: relative;
`;

export const StyledWorkingHoursSection = styled.div`
  width: 300px;
  ${sharedContainerStyles};
  font-weight: 400;
  font-size: 16px;

  @media (min-width: 1000px) {
    max-width: 400px;
    margin: 0 !important;
  }
`;

export const StyledWorkingHoursLabel = styled.span``;

export const StyledBrandTitle = styled.div`
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

export const StyledBrandTitleSity = styled.span`
  font-size: 24px;
`;

export const StyledBrandTitlePro = styled.span`
  font-size: 18px;
`;

export const StyledWorkingHoursTitle = styled.div`
  margin-bottom: 5px;
  font-weight: 600;
`;

export const StyledNavigationHeader = styled.nav`
  ${sharedContainerStyles};
  ${sharedFlexStyles};
  justify-content: space-between;
  padding-bottom: 25px;
  gap: 10px;
`;

export const StyledMenuToggleButton = styled.button`
  min-width: 100px;
  font-size: 18px;
  padding: 15px 0;
  ${sharedMarginBottom};

  @media (min-width: 500px) {
    padding: 5px;
    font-size: 22px;
  }
`;

export const StyledNavigationList = styled.ul`
  font-size: 14px;
  max-width: 350px;
  ${sharedFlexStyles};
  flex-direction: column;
  gap: 15px;
  flex-wrap: wrap;
  align-items: center;
  position: relative;

  text-align: center;
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

export const StyledNavigationListItem = styled.li``;

export const StyledNavigationButton = styled.button`
  width: 100px;
`;

export const StyledSocialWrapper = styled.ul`
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
  ${sharedFlexStyles};
  justify-content: center;
  align-items: center;
  overflow: hidden;
  ${borderRadiusStyles};
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

export const StyledTelephoneLink = styled.a`
  ${sharedFlexStyles};
  align-items: center;
  font-size: 16px;
`;

export const StyledMainNavigation = styled.nav`
  width: 100%;
  height: 50px;
  overflow: hidden;
  position: relative;
  border: 1px solid #e0e0e0;
  justify-content: center;
  align-items: center;
  ${sharedFlexStyles};

  // border: 1px solid rgba(255, 0, 0, 0.795);

  background-color: #ffffff;
`;

export const StyledScrollerWrapper = styled.div`
  width: 100%;
  /* коли $noScroll=true — не ховаємо, інакше ховаємо як раніше */
  overflow: ${(p) => (p.$noScroll ? "visible" : "hidden")};
`;

export const StyledMainNavigationList = styled.ul`
  ${sharedFlexStyles};
  gap: 10px;

  ${(p) =>
    p.$marquee &&
    `
    animation: scroll-left 50s linear infinite;
    &:hover { animation-play-state: paused; }
  `}

  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

export const StyledMainNavigationListItem = styled.li`
  min-width: 140px;
  height: 40px;
  font-size: 10px;
  background: #ffffff;
  ${borderRadiusStyles};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const StyledMainNavigationLink = styled(Link)`
  display: block;
  padding: 0 12px;
  line-height: 40px;
`;
