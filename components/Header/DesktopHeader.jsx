import { useTranslation } from "next-i18next";

import Logo from "./Logo";
import SearchButton from "./SearchButton";
import CartButton from "./CartButton";

import {
  StyledDesktopHeader,
  StyledDesktopNav,
  StyledHeaderRight,
} from "./StyledHeader";

import FavoritesButton from "./FavoritesButton";

export default function DesktopHeader() {
  const { t } = useTranslation("common");

  return (
    <StyledDesktopHeader>
      <StyledDesktopNav>
        <a href="/kodi">{t("catalog")}</a>
        <a href="/delivery">{t("delivery")}</a>
        <a href="/contacts">{t("contacts")}</a>
      </StyledDesktopNav>

      <Logo />

    <StyledHeaderRight>
  <SearchButton />
  <FavoritesButton />
  <CartButton />
</StyledHeaderRight>
    </StyledDesktopHeader>
  );
}