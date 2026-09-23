import { useState } from "react";

import { HiXMark, HiChevronLeft } from "react-icons/hi2";

import { useTranslation } from "next-i18next";

import {
  StyledMobileMenu,
  StyledMobileMenuOverlay,
  StyledMobileMenuClose,
  StyledMobileMenuList,
  StyledMobileMenuItem,
  StyledMobileMenuLink,
  StyledMenuLogo,
  StyledMobileCatalogButton,
  StyledMobileBackButton,
} from "./StyledHeader";

import LanguageSwitcher from "./LanguageSwitcher";

import brandsCatalog from "@/lib/kodi/brandsCatalog";

export default function MobileMenu({
  open,
  onClose,
}) {
  const { t: tCommon } = useTranslation("common");

  const { t } = useTranslation([
    "brandsCatalog",
    "kodiCatalogList",
  ]);

  const [catalogOpen, setCatalogOpen] = useState(false);

  if (!open) return null;

  const openCatalog = () => {
    setCatalogOpen(true);
  };

  const closeCatalog = () => {
    setCatalogOpen(false);
  };

  const handleClose = () => {
    setCatalogOpen(false);
    onClose();
  };

  return (
    <>
      <StyledMobileMenuOverlay
        onClick={handleClose}
      />

      <StyledMobileMenu>
        <StyledMobileMenuClose
          type="button"
          onClick={handleClose}
          aria-label={tCommon("close")}
        >
          <HiXMark />
        </StyledMobileMenuClose>

        <StyledMenuLogo
          href="/"
          onClick={handleClose}
        >
          kodi and more
        </StyledMenuLogo>

        <LanguageSwitcher />

        {!catalogOpen ? (
        <StyledMobileMenuList>
  <StyledMobileMenuItem>
    <StyledMobileMenuLink
      href="/"
      onClick={handleClose}
    >
      {tCommon("homePage")}
    </StyledMobileMenuLink>
  </StyledMobileMenuItem>

  <StyledMobileMenuItem>
    <StyledMobileCatalogButton
      type="button"
      onClick={openCatalog}
    >
      <span>
        {tCommon("catalog")}
      </span>
      <span>→</span>
    </StyledMobileCatalogButton>
  </StyledMobileMenuItem>

  <StyledMobileMenuItem>
    <StyledMobileMenuLink
      href="/delivery"
      onClick={handleClose}
    >
      {tCommon("delivery")}
    </StyledMobileMenuLink>
  </StyledMobileMenuItem>

</StyledMobileMenuList>
        ) : (
          <>
            <StyledMobileBackButton
              type="button"
              onClick={closeCatalog}
            >
              <HiChevronLeft />
              <span>{tCommon("back")}</span>
            </StyledMobileBackButton>

            <StyledMobileMenuList>
              {brandsCatalog.map((brand) => (
                <StyledMobileMenuItem
                  key={brand.id}
                >
                  <StyledMobileMenuLink
                    href={brand.href}
                    onClick={handleClose}
                  >
                    {t(brand.titleKey, {
                      ns:
                        brand.translation ||
                        "brandsCatalog",
                    })}
                  </StyledMobileMenuLink>
                </StyledMobileMenuItem>
              ))}
            </StyledMobileMenuList>
          </>
        )}
      </StyledMobileMenu>
    </>
  );
}