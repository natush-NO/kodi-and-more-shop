import { useEffect, useState } from "react";

import MenuButton from "./MenuButton";
import Logo from "./Logo";
import SearchButton from "./SearchButton";
import Search from "./Search";
import CartButton from "./CartButton";
import MobileMenu from "./MobileMenu";
import FavoritesButton from "./FavoritesButton";

import {
  StyledMobileHeader,
  StyledHeaderLeft,
  StyledHeaderCenter,
  StyledHeaderRight,
} from "./StyledHeader";

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const savedMenu = localStorage.getItem("mobile-menu");

    if (savedMenu === "true") {
      setMenuOpen(true);
    }
  }, []);

  const openMenu = () => {
    setMenuOpen(true);
    localStorage.setItem("mobile-menu", "true");
  };

  const closeMenu = () => {
    setMenuOpen(false);
    localStorage.removeItem("mobile-menu");
  };

  const openSearch = () => {
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  return (
    <>
      <StyledMobileHeader>
        <StyledHeaderLeft>
          <MenuButton onClick={openMenu} />
        </StyledHeaderLeft>

        <StyledHeaderCenter>
          <Logo />
        </StyledHeaderCenter>

        <StyledHeaderRight>
          <SearchButton onClick={openSearch} />
          <FavoritesButton />
          <CartButton />
        </StyledHeaderRight>
      </StyledMobileHeader>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
      />

      <Search
        open={searchOpen}
        onClose={closeSearch}
      />
    </>
  );
}