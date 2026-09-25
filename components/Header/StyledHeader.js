import styled from "styled-components";
import Link from "next/link";

/* =========================================================
   MOBILE HEADER
========================================================= */

export const StyledMobileHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;

  width: 100%;
  height: 64px;

  background: #2f2f2f;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 18px;

  box-sizing: border-box;

  @media (min-width: 993px) {
    display: none;
  }
`;

/* =========================================================
   DESKTOP HEADER
========================================================= */

export const StyledDesktopHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;

  width: 100%;
  height: 68px;

  background: #2f2f2f;
  color: #fff;

  padding: 40px 40px 50px 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;

  @media (max-width: 992px) {
    display: none;
  }
`;

export const StyledDesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;

  & > a {
    color: #fff;
    text-decoration: none;
    font-size: 16px;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const StyledHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledHeaderCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

/* =========================================================
   HEADER BUTTONS
========================================================= */

export const StyledHeaderButton = styled.button`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  padding: 0;

  background: transparent;
  border: none;

  color: #fff;

  cursor: pointer;

  /* =========================
     FAVORITES
  ========================= */

  .favorite-icon {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 28px;
    height: 28px;
  }

  .favorite-icon svg {
    width: 25px;
    height: 25px;

    display: block;
  }

  .favorite-count {
    position: absolute;

    top: -5px;
    right: -6px;

    width: 15px;
    height: 15px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: #d9b9aa;
    color: #2f2f2f;

    font-size: 9px;
    font-weight: 600;
    line-height: 1;
  }

  /* =========================
     CART
  ========================= */

  .cart-icon {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 28px;
    height: 28px;
  }

  .cart-icon svg {
    width: 25px;
    height: 25px;

    stroke-width: 1.4;
  }

  .cart-count {
    position: absolute;

    top: -3px;
    right: -4px;

    width: 15px;
    height: 15px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: #d9b9aa;
    color: #2f2f2f;

    font-size: 9px;
    font-weight: 600;
    line-height: 1;
  }

  /* =========================
     SEARCH
  ========================= */

  ${({ $isSearch }) =>
    $isSearch &&
    `
    width: 150px;
    height: 42px;

    justify-content: flex-start;
    gap: 9px;

    padding: 0 12px;

    color: rgba(255, 255, 255, 0.55);

    border-right: 1px solid rgba(255, 255, 255, 0.18);
    border-left: 1px solid rgba(255, 255, 255, 0.18);

    font-size: 11px;
    font-weight: 400;

    white-space: nowrap;

    svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    span {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media (max-width: 992px) {
      width: 42px;
      padding: 0;

      justify-content: center;

      border-left: none;

      span {
        display: none;
      }
    }
  `}

  &:hover {
    opacity: 0.8;
  }
`;

/* =========================================================
   LOGO
========================================================= */

export const StyledLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
`;

export const StyledLogoTitle = styled.div`
  position: relative;

  color: #fff;

  font-size: 54px;
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 0.9;

  @media (max-width: 992px) {
    font-size: 20px;
  }
`;

export const StyledLogoHeart = styled.span`
  position: absolute;

  top: 2px;
  right: -18px;

  color: #d9b9aa;

  font-size: 18px;
  line-height: 1;

  @media (max-width: 992px) {
    top: -2px;
    right: -9px;

    font-size: 7px;
  }
`;

export const StyledLogoSubtitle = styled.span`
  margin-top: 8px;

  color: rgba(255, 255, 255, 0.75);

  font-family: "Manrope", sans-serif;
  font-size: 8px;
  font-weight: 500;
  line-height: 1;

  letter-spacing: 4px;
  text-transform: uppercase;

  white-space: nowrap;
`;

export const StyledMenuLogo = styled(Link)`
  color: #111;
  text-decoration: none;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 40px;
`;

/* =========================================================
   MOBILE MENU
========================================================= */

export const StyledMobileMenuOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  z-index: 999;
`;

export const StyledMobileMenu = styled.aside`
  position: fixed;
  top: 74px;
  left: 0;
  right: 0;
  width: 100%;
  min-height: calc(100vh - 74px);
  background: #fff;
  z-index: 1000;
  padding: 28px 24px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

export const StyledMobileMenuClose = styled.button`
  position: absolute;
  top: 18px;
  right: 24px;
  background: transparent;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #111;
`;

export const StyledMobileMenuList = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 26px;
  list-style: none;
`;

export const StyledMobileMenuItem = styled.li`
  width: 100%;
`;

export const StyledMobileMenuLink = styled(Link)`
  color: #111;
  text-decoration: none;
  font-size: 24px;
  font-weight: 500;
  transition: 0.25s;

  &:hover {
    color: #777;
  }
`;

/* =========================================================
   CATALOG
========================================================= */

export const StyledCatalogDropdown = styled.div`
  position: relative;
`;

export const StyledCatalogButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  span {
    font-size: 14px;
    line-height: 1;
  }
`;

/* =========================================================
   DESKTOP CATALOG MEGA MENU
========================================================= */

export const StyledCatalogMenus = styled.div`
  position: fixed;
  top: 86px;
  left: 50%;
  transform: translateX(-50%);
  width: min(1100px, calc(100vw - 40px));
  max-height: calc(100vh - 110px);
  padding: 34px 36px;
  background: #fff;
  color: #111;
  border-radius: 0;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
  z-index: 1100;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 45px;
  row-gap: 35px;

  @media (max-width: 1200px) {
    width: calc(100vw - 40px);
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 30px;
  }

  @media (max-width: 992px) {
    display: none;
  }
`;

export const StyledCatalogBrand = styled.div`
  min-width: 0;
`;

export const StyledCatalogBrandTitle = styled(Link)`
  display: block;
  margin-bottom: 18px;
  color: #111;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;

  &:hover {
    opacity: 0.6;
  }
`;

export const StyledCatalogBrandList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StyledCatalogBrandItem = styled.li`
  margin: 0;
  padding: 0;
`;

export const StyledCatalogBrandLink = styled(Link)`
  display: block;
  color: #333;
  text-decoration: none;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.4;
  transition: color 0.2s ease;

  &:hover {
    color: #999;
  }
`;

/* =========================================================
   MOBILE CATALOG
========================================================= */

export const StyledMobileCatalogButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  border: none;
  background: transparent;
  color: #111;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    color: #777;
  }
`;

export const StyledMobileBackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 0;
  border: none;
  background: transparent;
  color: #111;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    color: #777;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const StyledCatalogClose = styled.button`
  position: absolute;
  top: 16px;
  right: 20px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  color: #111;
  font-size: 30px;
  font-weight: 300;
  line-height: 1;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.5;
  }
`;

/* =========================================================
   CONTACT SIDEBAR
   ========================================================= */

export const StyledContactsSidebar = styled.aside`
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 1200;

  width: 150px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  overflow: visible;
`;

export const StyledContactsItem = styled.div`
  width: 100px;
  height: 50px;

  margin: 0;
  padding: 0;

  display: flex;
  justify-content: flex-end;

  overflow: visible;
`;

export const StyledContactsLink = styled.a`
  position: relative;

  width: 48px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  color: #fff !important;
  text-decoration: none;

  background: ${({ $type }) => {
    switch ($type) {
      case "phone":
        return "#d9232e";
      case "instagram":
        return "#8a4b32";
      case "whatsapp":
        return "#20bca9";
      case "telegram":
        return "#35a9df";
      case "viber":
        return "#87459c";
      default:
        return "#111";
    }
  }};

  svg {
    width: 19px;
    height: 19px;
    flex-shrink: 0;

    color: #fff !important;
    fill: currentColor;
  }
`;

export const StyledContactsText = styled.span`
  position: absolute;

  right: 48px;
  top: 0;

  height: 44px;

  padding: 0 16px;

  display: flex;
  align-items: center;

  box-sizing: border-box;

  white-space: nowrap;

  color: #fff !important;

  font-size: 16px;
  font-weight: 600;
  line-height: 1;

  opacity: 0;
  visibility: hidden;

  transition:
    opacity 0.15s ease,
    visibility 0s linear 0.1s;

  background: inherit;

  ${StyledContactsLink}:hover & {
    opacity: 1;
    visibility: visible;
    transition-delay: 0.05s;
  }

  @media (max-width: 992px) {
    display: none;
  }
`;
