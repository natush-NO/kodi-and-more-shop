import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
import brandsCatalog from "@/lib/brandsData";

import {
  StyledOverlay,
  StyledTopStickyBar,
  StyledBrandTitle,
  StyledBrandTitleSity,
  StyledBrandTitlePro,
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
  StyledCatalogMenuBackLink,
} from "../BrandCatalogMenuItem/StyledBrandICatalogMenuItem";
import { StyledMainContainer } from "../StyledIndex";
// import BrandItem from "../BrandCatalogMenuItem/BrandICatalogMenuItem";
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
import kodiCatalog from "@/lib/kodiCatalog";

export default function Header({ isBack, isBackProject, kodiPage = false }) {
  const langRef = useRef(null);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [iconSizeWidth, setIconSizeWidth] = useState(50);
  const [iconSizeHeight, setIconSizeHeight] = useState(40);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const { t, i18n } = useTranslation([
    "common",
    "categoriesBeauty",
    "kodiNailsCollections",
  ]);

  const onChangeLang = async (lng) => {
    try {
      await router.push(router.pathname, router.asPath, { locale: lng });
      setIsLangOpen(false);
      setIsOverlayOpen(false);
    } catch (e) {
      console.error("Failed to change language:", e);
    }
  };

  const getFlagByLang = (lang) => `/flags/${lang === "en" ? "us" : "uk"}.png`;

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
                        onClick={() => onChangeLang("uk")}
                      >
                        {t("languageUA")}
                      </StyledLanguageButtonOpen>

                      <StyledLanguageButtonOpen
                        $flag="us"
                        onClick={() => onChangeLang("en")}
                      >
                        {t("languageEN")}
                      </StyledLanguageButtonOpen>
                    </StyledLanguageSelectorOpen>
                  )}
                </StyledLanguageSelector>

                <StyledNavigationListItem>
                  <StyledNavigationButton
                    onClick={() => {
                      const next = !isCatalogOpen;
                      setIsCatalogOpen(next);
                      setIsOverlayOpen(next);
                      if (!next)
                        document.getElementById("catalog-button")?.focus();
                    }}
                    type="button"
                    aria-label={isCatalogOpen ? t("back") : t("catalog")}
                    id="catalog-button"
                    aria-haspopup="menu"
                    aria-expanded={isCatalogOpen}
                    aria-controls="catalog-menu"
                  >
                    {isCatalogOpen ? t("back") : t("catalog")}
                  </StyledNavigationButton>
                </StyledNavigationListItem>

                {isCatalogOpen && (
                  <StyledCatalogMenuWrapper
                    aria-labelledby="catalog-button"
                    id="catalog-menu"
                  >
                    <StyledCatalogMenuList>
                      {brandsCatalog.map(({ id, name, nameKey, route }) => {
                        const href =
                          route ?? `/brandsCatalog/${encodeURIComponent(id)}`;

                        return (
                          <StyledCatalogMenuListItem key={id}>
                            <StyledCatalogMenuLink
                              href={href}
                              onClick={() => {
                                setIsCatalogOpen(false);
                                setIsOverlayOpen(false);
                                document
                                  .getElementById("catalog-button")
                                  ?.focus();
                              }}
                            >
                              {nameKey ? t(nameKey) : name}
                            </StyledCatalogMenuLink>
                            <StyledCatalogMenuBackLink
                              href="/"
                              onClick={() => {
                                setIsCatalogOpen(false);
                                setIsOverlayOpen(false);
                                document
                                  .getElementById("catalog-button")
                                  ?.focus();
                              }}
                            >
                              {t("homePage")}
                            </StyledCatalogMenuBackLink>
                          </StyledCatalogMenuListItem>
                        );
                      })}
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
              <StyledBrandTitleSity>{t("sity")}</StyledBrandTitleSity> <br />
              Kodi
              <br /> <StyledBrandTitlePro>Professional</StyledBrandTitlePro>
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
          <StyledScrollerWrapper $noScroll={kodiPage}>
            <StyledMainNavigationList $marquee={!kodiPage}>
              {(kodiPage
                ? kodiCatalog.map((cat) => ({
                    key: cat.id,
                    label: t(cat.nameKey, { ns: "categoriesBeauty" }),
                    href:
                      cat.route && cat.route !== "#"
                        ? cat.route
                        : `/kodi/${cat.id}`,
                  }))
                : [...Array(2)].flatMap((_, i) =>
                    brands.map((brand, index) => ({
                      key: `${i}-${index}`,
                      label: brand,
                      href: "#",
                    }))
                  )
              ).map((item) => (
                <StyledMainNavigationListItem key={item.key}>
                  <StyledMainNavigationLink href={item.href}>
                    {item.label}
                  </StyledMainNavigationLink>
                </StyledMainNavigationListItem>
              ))}
            </StyledMainNavigationList>
          </StyledScrollerWrapper>
        </StyledMainNavigation>

        <StyledBottomHeader />
      </StyledHeader>
    </>
  );
}
