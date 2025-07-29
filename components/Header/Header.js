import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  StyledStickyTopBar,
  StyledBrandName,
  StyledBrandNameSpan,
  StyledHeader,
  StyledBottomHeader,
  StyledNavHeader,
  StyledButtonMenu,
  StyledLanguageBox,
  StyledLanguageButton,
  StyledNavItems,
  StyledNavItem,
  StyledNavButton,
  StyledSocialItems,
  StyledSocialItem,
  StyledSocialLink,
  StyledPhoneLink,
  StyledHeaderInfoBar,
  StyledOpeningHours,
  StyledOpeningHoursSpan,
  StyledOpeningHoursTitel,
  StyledSearchBocks,
  StyledSearchInput,
  StyledFaSearch,
  StylednavigationMenu,
  StyledNavigationMenu__List,
  StyledNavigationMenu__Item,
  StyledNavigationMenu__Link,
  // StyledNavigationMenu__ItemNails,
} from "./StyledHeader";
import { StyledMainContainer } from "../StyledIndex";
import {
  FaInstagram,
  FaFacebook,
  FaPhone,
  FaMapMarkerAlt,
  FaSearch,
} from "react-icons/fa";
import { useTranslation } from "next-i18next";

export default function Header({
  isBack,
  handleShowText,
  pageCertificate,
  isBackProject,
  changeLanguage,
}) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [iconSizeWidth, setIconSizeWidth] = useState(50);
  const [iconSizeHeight, setIconSizeHeight] = useState(40);

  const { t, i18n } = useTranslation("common");

  // const LanguageSwitcher = () => {
  //   const router = useRouter();
  //   const { locale, pathname, query, asPath } = router;

  //   const changeLanguage = (lng) => {
  //     router.push({ pathname, query }, asPath, { locale: lng });
  //   };

  //   const handleNavigation = (path) => {
  //     if (path) {
  //       router.push(path).then(() => handleShowText());
  //     } else {
  //       handleShowText();
  //     }
  //   };
  // };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
      setIconSizeWidth(window.innerWidth < 900 ? 25 : 15);
      setIconSizeHeight(
        window.innerWidth < 450 ? 30 : window.innerHeight < 750 ? 25 : 15
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
      icon: <FaMapMarkerAlt size={(iconSizeWidth, iconSizeHeight)} />,
      alt: "Location",
    },
  ];

  const socialLinks = [
    { href: "http://instagram.com/kodi_uzhgorod", alt: "Instagram" },
    {
      href: "https://www.facebook.com/kodi.transcarpathian",
      alt: "Facebook",
    },
    {
      href: "https://www.google.com/maps/dir/51.2014328,6.4410627/Shevchenka+Ln,+23,+Uzhhorod,+Zakarpats'ka+oblast,+Ukraine,+88000/@49.0166857,3.815387,5z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x47391847e919db07:0xc0ed593031ed73a4!2m2!1d22.2789898!2d48.6318722?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
      alt: "Location",
    },
  ];

  // if (typeof window === "undefined") {
  //   console.log("Це сервер");
  // } else {
  //   console.log("Це клієнт");
  // }

  console.log("✅ Header component loaded");

  return (
    <>
      <StyledStickyTopBar />
      <StyledHeader>
        <StyledMainContainer>
          <StyledNavHeader>
            {isMobile && (
              <StyledButtonMenu
                onClick={toggleMenu}
                aria-label={isMenuOpen ? t("close") : t("menu")}
              >
                {isMenuOpen ? t("close") : t("menu")}
              </StyledButtonMenu>
            )}

            {(isMobile && isMenuOpen) || !isMobile ? (
              <StyledNavItems id="burger">
                <StyledNavItem>
                  <StyledNavButton
                    onClick={() =>
                      router.push(isBackProject ? "/" : "/projectsPage")
                    }
                    type="button"
                    aria-label={isBackProject ? t("back") : t("myProjects")}
                  >
                    {isBackProject ? t("back") : t("catalog")}
                  </StyledNavButton>
                </StyledNavItem>

                <StyledNavItem>
                  <StyledLanguageBox>
                    <StyledLanguageButton onClick={() => changeLanguage("uk")}>
                      UA
                    </StyledLanguageButton>
                    <StyledLanguageButton onClick={() => changeLanguage("en")}>
                      EN
                    </StyledLanguageButton>
                  </StyledLanguageBox>
                  <StyledNavButton
                    onClick={() =>
                      router.push(isBack ? "/" : "/certificatesPage")
                    }
                    type="button"
                    aria-label={isBack ? t("back") : t("certificates")}
                  >
                    {isBack ? t("back") : t("delivery")}
                  </StyledNavButton>
                </StyledNavItem>
              </StyledNavItems>
            ) : null}

            <StyledSocialItems>
              <StyledPhoneLink
                href="tel:+380999284258"
                aria-label={t("callPhone")}
              >
                <FaPhone size={24} />
                <span>+380999284258</span>
              </StyledPhoneLink>

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

          <StyledHeaderInfoBar>
            <StyledBrandName>
              <StyledBrandNameSpan>Ужгород</StyledBrandNameSpan> <br />
              Kodi
            </StyledBrandName>
            <StyledSearchBocks>
              <StyledSearchInput
                type="text"
                name="q"
                id="q"
                autoComplete="off"
                maxLength="90"
                spellCheck="false"
                placeholder={t("searchPlaceholder")}
              />
              <StyledFaSearch>
                <FaSearch size={18} color="#666666" />
              </StyledFaSearch>
            </StyledSearchBocks>

            <StyledOpeningHours>
              <StyledOpeningHoursTitel>
                {t("workingHours")}:
              </StyledOpeningHoursTitel>
              <div>
                <StyledOpeningHoursSpan>{t("monFri")}:</StyledOpeningHoursSpan>{" "}
                10:00–18:00
              </div>
              <div>
                <StyledOpeningHoursSpan>{t("satSun")}:</StyledOpeningHoursSpan>{" "}
                10:00–16:00
              </div>
            </StyledOpeningHours>
          </StyledHeaderInfoBar>
        </StyledMainContainer>

        <StylednavigationMenu>
          <StyledMainContainer>
            <StyledNavigationMenu__List>
              <StyledNavigationMenu__Item>
                <StyledNavigationMenu__Link>
                  {t("manicurePedicure")}
                </StyledNavigationMenu__Link>
                <StyledNavigationMenu__Link>
                  {t("makeup")}
                </StyledNavigationMenu__Link>
              </StyledNavigationMenu__Item>
            </StyledNavigationMenu__List>
          </StyledMainContainer>
        </StylednavigationMenu>

        <StyledBottomHeader />
      </StyledHeader>
    </>
  );
}
