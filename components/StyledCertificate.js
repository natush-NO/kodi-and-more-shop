import { styled } from "styled-components";
import Image from "next/image";

export const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const StyledModalImageContainer = styled.div`
  border-radius: 5px;
  position: relative;
  width: 340px;
  height: 300px;

  @media (min-width: 520px) {
    width: 500px;
    height: 400px;
  }

  @media (min-width: 700px) {
    width: 650px;
    height: 500px;
  }

  @media (min-width: 850px) {
    width: 800px;
    height: 600px;
  }
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 42px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px 3px 0 3px;

  z-index: 1001;

  @media (hover: hover) {
    &:hover {
      opacity: 0.7;
    }
  }

  @media (min-width: 520px) {
    padding: 7px 5px 0 5px;
    font-size: 50px;
  }
`;

export const StyledModalImage = styled(Image)`
  object-fit: content;
  width: 100%;
  height: 100%;
`;

export const StyledCertificateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding-bottom: 50px;
`;

export const StyledImageContainer = styled.div`
  width: 350px;
  height: 300px;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

  @media (min-width: 530px) {
    width: 500px;
    height: 350px;
  }

  @media (min-width: 700px) {
    width: 600px;
    height: 400px;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(20, 75, 110, 0.265);
    z-index: 1;
    transition: opacity 0.9s ease;
    opacity: 0;
  }

  @media (hover: hover) {
    &:hover:after {
      opacity: 1;
    }
  }
`;

export const StyledCertificateImage = styled(Image)`
  object-fit: content;
  width: 100%;
  height: 100%;
`;
