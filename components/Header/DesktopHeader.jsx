import { useState } from "react";
import { useTranslation } from "next-i18next";

import Logo from "./Logo";
import CatalogDropdown from "./CatalogDropdown";
import SearchButton from "./SearchButton";
import Search from "./Search";
import CartButton from "./CartButton";
import FavoritesButton from "./FavoritesButton";
import ContactDropdown from "./ContactDropdown";

import {
  StyledDesktopHeader,
  StyledDesktopNav,
  StyledHeaderRight,
} from "./StyledHeader";

export default function DesktopHeader() {
  const { t } = useTranslation("common");

  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <StyledDesktopHeader>
        <StyledDesktopNav>
          <a href="/">
            {t("homePage")}
          </a>

          <CatalogDropdown />

          <a href="/delivery">
            {t("delivery")}
          </a>

          <ContactDropdown />
        </StyledDesktopNav>

        <Logo />

        <StyledHeaderRight>
          <SearchButton
            onClick={() => setSearchOpen(true)}
          />

          <FavoritesButton />
          <CartButton />
        </StyledHeaderRight>
      </StyledDesktopHeader>

      <Search
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}