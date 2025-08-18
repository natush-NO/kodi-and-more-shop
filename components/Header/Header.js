import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import brandsCatalog from "@/lib/brandsData";
import {
  StyledOverlay,
  StyledTopStickyBar,
  StyledBrandTitle,
  StyledBrandTitleSpan,
  StyledHeader,
  StyledBottomHeader,
  StyledNavigationHeader,
  StyledMenuToggleButton,
  StyledLanguageSelector,
  StyledLanguageSelectorOpen,
  StyledLanguageButtonOpen,
  StyledLanguageButtonClose,
  StyledNavigationList,
  StyledNavigationListItem,
  StyledNavigationButton,
  StyledSearchUserContainer,
  StyledSearchContainer,
  StyledUserMenuContainer,
  StyledUserIconWrapper,
  StyledFavoritesIconWrapper,
  StyledCartIconWrapper,
  StyledSearchField,
  StyledSearchIconWrapper,
  StyledSocialWrapper,
  StyledSocialItem,
  StyledSocialLink,
  StyledTelephoneLink,
  StyledHeaderInfoBar,
  StyledWorkingHoursSection,
  StyledWorkingHoursLabel,
  StyledWorkingHoursTitle,
  StyledMainNavigation,
  StyledScrollerWrapper,
  StyledMainNavigationList,
  StyledMainNavigationListItem,
  StyledMainNavigationLink,
} from "./StyledHeader";
import {
  StyledCatalogMenuWrapper,
  StyledCatalogMenuList,
  StyledCatalogMenuListItem,
  StyledCatalogMenuLink,
} from "../BrandCatalogMenuItem/StyledBrandICatalogMenuItem";
import { StyledMainContainer } from "../StyledIndex";
import BrandItem from "../BrandCatalogMenuItem/BrandICatalogMenuItem";
import {
  FaInstagram,
  FaFacebook,
  FaPhone,
  FaMapMarkerAlt,
  FaSearch,
  FaAngleDown,
  FaAngleUp,
  FaUser,
  FaHeart,
  FaShoppingBasket,
} from "react-icons/fa";
import { useTranslation } from "next-i18next";

export default function Header({
  isBack,
  // handleShowText,
  // pageCertificate,
  isBackProject,
  changeLanguage,
  isCatalogOpen,
  closeCatalog,
  setIsCatalogOpen,
  toggleCatalog,
}) {
  const langRef = useRef(null);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [iconSizeWidth, setIconSizeWidth] = useState(50);
  const [iconSizeHeight, setIconSizeHeight] = useState(40);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const { t, i18n } = useTranslation("common");

  const getFlagByLang = (lang) => `/flags/${lang === "en" ? "us" : "uk"}.png`;

  console.log("Flag path:", getFlagByLang(i18n.language));

  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        if (isLangOpen) {
          setIsLangOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangOpen]);

  const toggleLanguageMenu = () => {
    if (!isLangOpen) {
      setIsOverlayOpen(true);
    } else {
      setIsOverlayOpen(false);
    }
    setIsLangOpen((prev) => !prev);
  };

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

  const brands = [
    "Kodi",
    "YO!Nails",
    "D.I.S",
    "Nub",
    "Edlen",
    "Baby Moon",
    "Divia",
    "NailApex",
    "Staleks",
    t("sanitizers"),
    t("cutters"),
  ];

  const doubledBrands = [...brands, ...brands];

  return (
    <>
      {(isOverlayOpen || isCatalogOpen) && (
        <StyledOverlay
          onClick={() => {
            if (isLangOpen) setIsLangOpen(false);
            if (isCatalogOpen) setIsCatalogOpen(false);
            setIsOverlayOpen(false);
          }}
        />
      )}
      <StyledTopStickyBar />
      <StyledHeader>
        <StyledMainContainer>
          <StyledNavigationHeader>
            {isMobile && (
              <StyledMenuToggleButton
                onClick={toggleMenu}
                aria-label={isMenuOpen ? t("close") : t("menu")}
              >
                {isMenuOpen ? t("close") : t("menu")}
              </StyledMenuToggleButton>
            )}

            {(isMobile && isMenuOpen) || !isMobile ? (
              <StyledNavigationList id="burger">
                <StyledLanguageSelector ref={langRef}>
                  <StyledLanguageButtonClose
                    $flag={i18n.language === "en" ? "us" : "uk"}
                    onClick={toggleLanguageMenu}
                  >
                    {i18n.language === "en" ? t("languageEN") : t("languageUA")}
                    {isLangOpen ? (
                      <FaAngleUp style={{ marginLeft: "5px" }} />
                    ) : (
                      <FaAngleDown style={{ marginLeft: "5px" }} />
                    )}
                  </StyledLanguageButtonClose>

                  {isLangOpen && (
                    <StyledLanguageSelectorOpen>
                      <StyledLanguageButtonOpen
                        $flag="uk"
                        onClick={() => {
                          changeLanguage("uk");
                          setIsLangOpen(false);
                          setIsOverlayOpen(false);
                        }}
                      >
                        {t("languageUA")}
                      </StyledLanguageButtonOpen>

                      <StyledLanguageButtonOpen
                        $flag="us"
                        onClick={() => {
                          changeLanguage("en");
                          setIsLangOpen(false);
                          setIsOverlayOpen(false);
                        }}
                      >
                        {t("languageEN")}
                      </StyledLanguageButtonOpen>
                    </StyledLanguageSelectorOpen>
                  )}
                </StyledLanguageSelector>
                <StyledNavigationListItem>
                  <StyledNavigationButton
                    onClick={() => {
                      if (isBackProject) {
                        router.push("/");
                      } else {
                        const next = !isCatalogOpen;
                        setIsCatalogOpen(next);
                        setIsOverlayOpen(next);
                      }
                    }}
                    type="button"
                    aria-label={isBackProject ? t("back") : t("catalog")}
                    id="catalog-button"
                    aria-haspopup="menu"
                    aria-expanded={isCatalogOpen}
                    aria-controls="catalog-menu"
                  >
                    {isBackProject ? t("back") : t("catalog")}
                  </StyledNavigationButton>
                </StyledNavigationListItem>

                {isCatalogOpen && (
                  <StyledCatalogMenuWrapper aria-labelledby="catalog-button">
                    <StyledCatalogMenuList>
                      {brandsCatalog.map(({ id, name, nameKey }) => (
                        <StyledCatalogMenuListItem key={id}>
                          <StyledCatalogMenuLink
                            href={`/brandsCatalog/${id}`}
                            onClick={() => setIsCatalogOpen(false)}
                          >
                            {nameKey ? t(nameKey) : name}
                          </StyledCatalogMenuLink>
                        </StyledCatalogMenuListItem>
                      ))}
                    </StyledCatalogMenuList>
                  </StyledCatalogMenuWrapper>
                )}

                <StyledNavigationListItem>
                  <StyledNavigationButton
                    onClick={() =>
                      router.push(isBack ? "/" : "/certificatesPage")
                    }
                    type="button"
                    aria-label={isBack ? t("back") : t("certificates")}
                  >
                    {isBack ? t("back") : t("delivery")}
                  </StyledNavigationButton>
                </StyledNavigationListItem>
              </StyledNavigationList>
            ) : null}

            <StyledSocialWrapper>
              <StyledTelephoneLink
                href="tel:+380999284258"
                aria-label={t("callPhone")}
              >
                <FaPhone size={24} />
                <span>+380999284258</span>
              </StyledTelephoneLink>

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
            </StyledSocialWrapper>
          </StyledNavigationHeader>

          <StyledHeaderInfoBar>
            <StyledBrandTitle>
              <StyledBrandTitleSpan>{t("sity")}</StyledBrandTitleSpan> <br />
              Kodi
            </StyledBrandTitle>
            <StyledSearchUserContainer>
              <StyledUserMenuContainer>
                <StyledFavoritesIconWrapper title="Favorites">
                  <FaHeart />
                </StyledFavoritesIconWrapper>

                <StyledCartIconWrapper title="Cart">
                  <FaShoppingBasket />
                </StyledCartIconWrapper>
              </StyledUserMenuContainer>

              <StyledSearchContainer>
                <StyledSearchField
                  type="text"
                  name="q"
                  id="q"
                  autoComplete="off"
                  maxLength="90"
                  spellCheck="false"
                  placeholder={t("searchPlaceholder")}
                />
                <StyledSearchIconWrapper>
                  <FaSearch size={18} color="#666666" />
                </StyledSearchIconWrapper>
              </StyledSearchContainer>
            </StyledSearchUserContainer>

            <StyledWorkingHoursSection>
              <StyledWorkingHoursTitle>
                {t("workingHours")}:
              </StyledWorkingHoursTitle>
              <div>
                <StyledWorkingHoursLabel>
                  {t("monFri")}:
                </StyledWorkingHoursLabel>{" "}
                10:00–18:00
              </div>
              <div>
                <StyledWorkingHoursLabel>
                  {t("satSun")}:
                </StyledWorkingHoursLabel>{" "}
                10:00–16:00
              </div>
            </StyledWorkingHoursSection>
          </StyledHeaderInfoBar>
        </StyledMainContainer>

        <StyledMainNavigation>
          <StyledScrollerWrapper>
            <StyledMainNavigationList>
              {[...Array(10)].flatMap((_, i) =>
                brands.map((brand, index) => (
                  <StyledMainNavigationListItem key={`${i}-${index}`}>
                    <StyledMainNavigationLink href="#">
                      {brand}
                    </StyledMainNavigationLink>
                  </StyledMainNavigationListItem>
                ))
              )}
            </StyledMainNavigationList>
          </StyledScrollerWrapper>
        </StyledMainNavigation>

        <StyledBottomHeader />
      </StyledHeader>
    </>
  );
}
