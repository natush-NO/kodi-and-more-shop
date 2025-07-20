import styled, { css } from "styled-components";
import Image from "next/image";
import Link from "next/link";

const sharedContainerStyles = css`
  margin: 0 auto;
`;

const sharedFlexStyles = css`
  display: flex;
`;

const sharedButtonSize = css`
  // min-width: 0px;
`;

const sharedMarginBottom = css`
  margin-bottom: 50px;
`;

export const StyledNameHeader = styled.header`
  font-size: 45px;
  color: #ffffff;

  // @media (min-width: 1000px) {
  //   margin-bottom: 50px;
  // }
`;

export const StyledHeader = styled.header`
  min-height: 100px;
  padding: 20px 0;
  margin-bottom: 30px;

  @media (min-width: 1000px) {
    margin-bottom: 50px;
  }
`;

export const StyledTopHeader = styled.header`
  min-height: 200px;
  background-color: #000;
  padding: 10px 20px;
  border-radius: 10px;

  // @media (min-width: 1000px) {
  //   margin-bottom: 50px;
  // }
`;

export const StyledNavHeader = styled.nav`
  ${sharedContainerStyles};
  ${sharedFlexStyles};

  justify-content: space-between;
`;

export const StyledButtonMenu = styled.button`
  min-width: 100px;
  font-size: 18px;
  padding: 15px 0;
  ${sharedMarginBottom};

  @media (min-width: 500px) {
    ${sharedButtonSize};
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
    max-width: 700px;
    font-size: 22px;
    justify-content: flex-start;
    margin: 0 !important;
    gap: 20px;
  }
`;

export const StyledNavItem = styled.li``;

export const StyledNavButton = styled.button`
  ${sharedButtonSize};
`;

export const StyledSocialItems = styled.ul`
  // max-width: 250px;
  ${sharedFlexStyles};

  gap: 10px;
  flex-wrap: wrap;
  ${sharedContainerStyles};

  @media (min-width: 1000px) {
    max-width: 400px;

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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  transition: color 0.6s ease-in;

  @media (min-width: 600px) {
    width: 50px;
    height: 50px;
  }

  @media (min-width: 1000px) {
    width: 40px;
    height: 40px;
  }

  @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 255, 0.452);
      transition: color 0.9s ease;
    }
  }
`;
