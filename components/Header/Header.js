import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  StyledNameHeader,
  StyledHeader,
  StyledTopHeader,
  StyledNavHeader,
  StyledButtonMenu,
  StyledNavItems,
  StyledNavItem,
  StyledNavButton,
  StyledSocialItems,
  StyledSocialItem,
  StyledSocialLink,
} from "./StyledHeader";
import { StyledMainContainer } from "../StyledIndex";
<FaInstagram size={30} color="#E4405F" />;
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Header({
  isBack,
  handleShowText,
  pageCertificate,
  projectsPage,
  isBackProject,
}) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [iconSizeWidth, setIconSizeWidth] = useState(50);
  const [iconSizeHeight, setIconSizeHeight] = useState(40);

  const handleNavigation = (path) => {
    if (path) {
      router.push(path).then(() => handleShowText());
    } else {
      handleShowText();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
      setIconSizeWidth(window.innerWidth < 900 ? 40 : 50);
      setIconSizeHeight(
        window.innerWidth < 450 ? 30 : window.innerHeight < 750 ? 35 : 40
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const socialImageSvg = [
    {
      icon: <FaInstagram size={(iconSizeWidth, iconSizeHeight)} />,
      alt: "Instagram",
    },
    {
      icon: <FaFacebook size={(iconSizeWidth, iconSizeHeight)} />,
      alt: "Facebook",
    },
    {
      icon: <FaLinkedin size={(iconSizeWidth, iconSizeHeight)} />,
      alt: "LinkedIn",
    },
  ];

  const socialLinks = [
    { href: "https://www.instagram.com/natush_no", alt: "Instagram" },
    {
      href: "https://www.facebook.com/share/1pWFnzSbYqtE1Weo",
      alt: "Facebook",
    },
    { href: "https://www.linkedin.com/in/nataliia-osman", alt: "LinkedIn" },
  ];

  return (
    <StyledHeader>
      <StyledMainContainer>
        <StyledTopHeader>
          <StyledNavHeader>
            {isMobile && (
              <StyledButtonMenu onClick={toggleMenu} aria-label="Toggle menu">
                {isMenuOpen ? "Close" : "Menu"}
              </StyledButtonMenu>
            )}

            {(isMobile && isMenuOpen) || !isMobile ? (
              <StyledNavItems id="burger">
                <StyledNavItem>
                  <StyledNavButton
                    onClick={() =>
                      handleNavigation(
                        pageCertificate || projectsPage ? "/" : undefined
                      )
                    }
                    type="button"
                    aria-label="About me"
                  >
                    Про Kodi
                  </StyledNavButton>
                </StyledNavItem>

                <StyledNavItem>
                  <StyledNavButton
                    onClick={() =>
                      router.push(isBackProject ? "/" : "/projectsPage")
                    }
                    type="button"
                    aria-label={isBackProject ? "Back" : "My projects"}
                  >
                    {isBackProject ? "Back" : "Каталог"}
                  </StyledNavButton>
                </StyledNavItem>

                <StyledNavItem>
                  <StyledNavButton
                    onClick={() =>
                      router.push(isBack ? "/" : "/certificatesPage")
                    }
                    type="button"
                    aria-label={isBack ? "Back" : "Certificates"}
                  >
                    {isBack ? "Back" : "Доставка"}
                  </StyledNavButton>
                </StyledNavItem>
              </StyledNavItems>
            ) : null}

            <StyledSocialItems>
              {socialLinks.map(({ href, alt }) => {
                const matchingIcon = socialImageSvg.find(
                  (item) => item.alt === alt
                );
                return (
                  <StyledSocialItem key={alt}>
                    <StyledSocialLink
                      href={href}
                      target="_blank"
                      aria-label={alt}
                    >
                      {matchingIcon ? matchingIcon.icon : null}
                    </StyledSocialLink>
                  </StyledSocialItem>
                );
              })}
            </StyledSocialItems>
          </StyledNavHeader>

          <StyledNameHeader>Kodi</StyledNameHeader>
        </StyledTopHeader>
      </StyledMainContainer>
    </StyledHeader>
  );
}
