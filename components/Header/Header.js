import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

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
  // StyledUserIconWrapper,
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

import {
  FaInstagram,
  FaFacebook,
  FaPhone,
  FaMapMarkerAlt,
  FaSearch,
  FaAngleDown,
  FaAngleUp,
  // FaUser,
  FaHeart,
  FaShoppingBasket,
} from "react-icons/fa";
import { useTranslation } from "next-i18next";
import kodiCatalog from "@/lib/kodi/kodiCatalog";
import brandsCatalog from "@/lib/brandsCatalog";

export default function Header({ isBack, kodiPage = false }) {
  const langRef = useRef(null);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [iconSize, setIconSize] = useState(20);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const { t, i18n } = useTranslation([
    "common",
    "categoriesBeauty",
    "kodiNailsCollections",
    "brandsCatalog",
  ]);

  const onChangeLang = async (lng) => {
    try {
      await router.push(router.asPath, undefined, { locale: lng });
      setIsLangOpen(false);
      setIsOverlayOpen(false);
    } catch (e) {
      console.error("Failed to change language:", e);
    }
  };

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
    setIsLangOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);

      if (window.innerWidth < 450) {
        setIconSize(30);
      } else if (window.innerHeight < 750) {
        setIconSize(25);
      } else {
        setIconSize(15);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const socials = [
    {
      href: "http://instagram.com/kodi_uzhgorod",
      alt: "Instagram",
      Icon: FaInstagram,
    },
    {
      href: "https://www.facebook.com/kodi.transcarpathian",
      alt: "Facebook",
      Icon: FaFacebook,
    },
    {
      href: "https://goo.gl/maps/Naj5BhFDMprcDNuj6",
      alt: "Location",
      Icon: FaMapMarkerAlt,
    },
  ];

  return (
    <>
      {/* {(isOverlayOpen || isCatalogOpen) && (
        <StyledOverlay
          onClick={() => {
            if (isLangOpen) setIsLangOpen(false);
            if (isCatalogOpen) setIsCatalogOpen(false);
            setIsOverlayOpen(false);
          }}
        />
      )} */}
      {(isLangOpen || isCatalogOpen) && (
        <StyledOverlay
          onClick={() => {
            setIsLangOpen(false);
            setIsCatalogOpen(false);
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
                                document
                                  .getElementById("catalog-button")
                                  ?.focus();
                              }}
                            >
                              {nameKey
                                ? t(nameKey, { ns: "brandsCatalog" })
                                : name}
                            </StyledCatalogMenuLink>
                          </StyledCatalogMenuListItem>
                        );
                      })}
                    </StyledCatalogMenuList>
                    <StyledCatalogMenuBackLink
                      href="/"
                      onClick={() => {
                        setIsCatalogOpen(false);
                        document.getElementById("catalog-button")?.focus();
                      }}
                    >
                      {t("homePage")}
                    </StyledCatalogMenuBackLink>
                  </StyledCatalogMenuWrapper>
                )}

                <StyledNavigationListItem>
                  <StyledNavigationButton
                    onClick={() =>
                      router.push(isBack ? "/" : "/certificatesPage")
                    }
                    type="button"
                    aria-label={isBack ? t("back") : t("delivery")}
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

              {socials.map(({ href, alt, Icon }) => (
                <StyledSocialItem key={alt}>
                  <StyledSocialLink
                    href={href}
                    target="_blank"
                    aria-label={alt}
                  >
                    <Icon size={iconSize} />
                  </StyledSocialLink>
                </StyledSocialItem>
              ))}
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
                    brandsCatalog.map((brand) => ({
                      key: `${i}-${brand.id}`,
                      label: brand.nameKey
                        ? t(brand.nameKey, { ns: "brandsCatalog" })
                        : brand.name,
                      href:
                        brand.route && brand.route !== "#"
                          ? brand.route
                          : `/brandsCatalog/${brand.id}`,
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
