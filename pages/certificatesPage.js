import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import {
  StyledModalOverlay,
  StyledModalImageContainer,
  StyledCloseButton,
  StyledModalImage,
  StyledCertificateContainer,
  StyledImageContainer,
  StyledCertificateImage,
} from "@/components/StyledCertificate";

import { StyledMain, StyledMainContainer } from "@/components/StyledIndex";
import { StyledBackgroundImgBody } from "@/components/StyledBackgroundImgBody";

export default function Certificates({ handleShowText }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  function openModal(imageSrc) {
    setScrollPosition(window.scrollY);
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedImage(null);
    window.scrollTo(0, scrollPosition);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      <StyledBackgroundImgBody>
        <Header
          isBack={true}
          pageCertificate={true}
          handleShowText={handleShowText}
        />
        <StyledMain>
          <StyledMainContainer>
            <StyledCertificateContainer>
              <StyledImageContainer
                onClick={() =>
                  openModal("/certificate_image/certificate_bootcamp.webp")
                }
              >
                <StyledCertificateImage
                  src="/certificate_image/certificate_bootcamp.webp"
                  alt="Certificate"
                  fill
                  sizes="500px"
                  priority
                />
              </StyledImageContainer>
              <StyledImageContainer
                onClick={() =>
                  openModal("/certificate_image/certificate_html_css_js.webp")
                }
              >
                <StyledCertificateImage
                  src="/certificate_image/certificate_html_css_js.webp"
                  alt="Certificate"
                  fill
                  sizes="500px"
                  priority
                />
              </StyledImageContainer>
              <StyledImageContainer
                onClick={() =>
                  openModal("/certificate_image/certificate_udemy.webp")
                }
              >
                <StyledCertificateImage
                  src="/certificate_image/certificate_udemy.webp"
                  alt="Certificate"
                  fill
                  sizes="500px"
                  priority
                />
              </StyledImageContainer>
            </StyledCertificateContainer>
          </StyledMainContainer>
        </StyledMain>

        {isModalOpen && (
          <StyledModalOverlay>
            <StyledModalImageContainer>
              <StyledCloseButton
                onClick={closeModal}
                aria-label="Close the modal window"
              >
                &times;
              </StyledCloseButton>
              <StyledModalImage
                src={selectedImage}
                alt="Certificate in enlarged form"
                fill
                sizes="800px"
              />
            </StyledModalImageContainer>
          </StyledModalOverlay>
        )}
      </StyledBackgroundImgBody>
    </>
  );
}
