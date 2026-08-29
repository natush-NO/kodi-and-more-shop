import { HiXMark } from "react-icons/hi2";

import {
  StyledMobileMenu,
  StyledMobileMenuOverlay,
  StyledMobileMenuClose,
  StyledMobileMenuList,
  StyledMobileMenuItem,
  StyledMobileMenuLink,
  StyledMenuLogo,
} from "./StyledHeader";

import LanguageSwitcher from "./LanguageSwitcher";

export default function MobileMenu({ open, onClose }) {
  if (!open) return null;

  return (
    <>
      <StyledMobileMenuOverlay onClick={onClose} />

      <StyledMobileMenu>
        <StyledMobileMenuClose onClick={onClose}>
          <HiXMark />
        </StyledMobileMenuClose>

     <StyledMenuLogo href="/" onClick={onClose}>
  kodi and more
</StyledMenuLogo>

<LanguageSwitcher />

        <StyledMobileMenuList>
          <StyledMobileMenuItem>
            <StyledMobileMenuLink href="/" onClick={onClose}>
              Головна
            </StyledMobileMenuLink>
          </StyledMobileMenuItem>

          <StyledMobileMenuItem>
            <StyledMobileMenuLink href="/kodi" onClick={onClose}>
              Каталог
            </StyledMobileMenuLink>
          </StyledMobileMenuItem>

          <StyledMobileMenuItem>
            <StyledMobileMenuLink href="/delivery" onClick={onClose}>
              Доставка
            </StyledMobileMenuLink>
          </StyledMobileMenuItem>

          <StyledMobileMenuItem>
            <StyledMobileMenuLink href="/about" onClick={onClose}>
              Про нас
            </StyledMobileMenuLink>
          </StyledMobileMenuItem>

          <StyledMobileMenuItem>
            <StyledMobileMenuLink href="/contacts" onClick={onClose}>
              Контакти
            </StyledMobileMenuLink>
          </StyledMobileMenuItem>
        </StyledMobileMenuList>
      </StyledMobileMenu>
    </>
  );
}
