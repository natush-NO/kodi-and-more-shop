import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  StyledStickyTopBar,
  StyledBrandName,
  StyledBrandNameSpan,
  StyledHeader,
  StyledBottomHeader,
  StyledNavHeader,
  StyledButtonMenu,
  StyledLanguageBox,
  StyledLanguageBoxOpen,
  StyledLanguageButtonOpen,
  StyledLanguageButtonClose,
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
  FaAngleDown,
  FaAngleUp,
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
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  const { t, i18n } = useTranslation("common");
  const toggleLanguageMenu = () => {
    setIsLangOpen((prev) => !prev);
  };

  const languageBoxRef = useRef(null);

  const getFlagByLang = (lang) =>
    `/flags/${lang === "en" ? "us.png" : "ua.png"}`;
  console.log("Flag path:", getFlagByLang(i18n.language));

  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      href: "https://goo.gl/maps/Naj5BhFDMprcDNuj6",
      alt: "Location",
    },
  ];

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
              <StyledLanguageBox ref={langRef}>
                <StyledLanguageButtonClose
                  onClick={() => setIsLangOpen(!isLangOpen)}
                >
                  <Image
                    src={getFlagByLang(i18n.language)}
                    alt="flag"
                    width={15}
                    height={10}
                    unoptimized
                    style={{ marginRight: "5px", borderRadius: "2px" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/flags/ua.png";
                    }}
                  />
                  {i18n.language === "en" ? t("languageEN") : t("languageUA")}
                  {isLangOpen ? (
                    <FaAngleUp style={{ marginLeft: "5px" }} />
                  ) : (
                    <FaAngleDown style={{ marginLeft: "5px" }} />
                  )}
                </StyledLanguageButtonClose>

                {isLangOpen && (
                  <StyledLanguageBoxOpen>
                    <StyledLanguageButtonOpen
                      $flag="ua"
                      onClick={() => {
                        changeLanguage("uk");
                        setIsLangOpen(false);
                      }}
                    >
                      {t("languageUA")}
                    </StyledLanguageButtonOpen>

                    <StyledLanguageButtonOpen
                      $flag="us"
                      onClick={() => {
                        changeLanguage("en");
                        setIsLangOpen(false);
                      }}
                    >
                      {t("languageEN")}
                    </StyledLanguageButtonOpen>
                  </StyledLanguageBoxOpen>
                )}
              </StyledLanguageBox>
            </StyledSocialItems>
          </StyledNavHeader>

          <StyledHeaderInfoBar>
            <StyledBrandName>
              <StyledBrandNameSpan>{t("sity")}</StyledBrandNameSpan> <br />
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
                <StyledNavigationMenu__Link>
                  {t("cosmetology")}
                </StyledNavigationMenu__Link>
                <StyledNavigationMenu__Link>
                  {t("skinCare")}
                </StyledNavigationMenu__Link>
                <StyledNavigationMenu__Link>
                  {t("lashes")}
                </StyledNavigationMenu__Link>
                <StyledNavigationMenu__Link>
                  {t("brows")}
                </StyledNavigationMenu__Link>
                <StyledNavigationMenu__Link>
                  {t("permanentMakeup")}
                </StyledNavigationMenu__Link>
                <StyledNavigationMenu__Link>
                  {t("podology")}
                </StyledNavigationMenu__Link>
                <StyledNavigationMenu__Link>
                  {t("equipment")}
                </StyledNavigationMenu__Link>
                <StyledNavigationMenu__Link>
                  {t("otherCategories")}
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
