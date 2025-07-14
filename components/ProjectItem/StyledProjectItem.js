import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const StyledProjectList = styled.li`
  width: 370px;
  height: 350px;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  @media (min-width: 530px) {
    width: 500px;
    height: 450px;
  }

  @media (min-width: 750px) {
    width: 650px;
    height: 550px;
  }
`;

export const StyledImageLink = styled(Link)`
  position: relative;
  width: 100%;
  height: 100%;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(20, 75, 110, 0.7);
    z-index: 2;
    transition: opacity 1s ease;
    opacity: 0;
  }

  &::before {
    content: "Details →";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    border-radius: 0 0 10px 10px;
    font-size: 22px;
    color: white;
    background-color: rgba(24, 101, 134, 0.956);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    padding: 15px 0;
    z-index: 1;

    @media (min-width: 530px) {
      font-size: 28px;
      padding: 25px 0;
    }
  }

  @media (hover: hover) {
    &:hover:after {
      opacity: 1;
    }
  }
`;

export const StyledCertificateImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
