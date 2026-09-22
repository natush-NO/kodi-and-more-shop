import { useEffect, useRef, useState } from "react";

import { useTranslation } from "next-i18next";
import {
  FaPhone,
  FaInstagram,
  FaTelegram,
  FaViber,
} from "react-icons/fa6";

import {
  StyledContactsDropdown,
  StyledContactsButton,
  StyledContactsMenu,
  StyledContactsClose,
  StyledContactsTitle,
  StyledContactsList,
  StyledContactsItem,
  StyledContactsLink,
} from "./StyledHeader";

export default function ContactDropdown({ mobile = false }) {
  const { t } = useTranslation("common");

  const [open, setOpen] = useState(false);
  const contactsRef = useRef(null);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contactsRef.current &&
        !contactsRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <StyledContactsDropdown
      ref={contactsRef}
      $mobile={mobile}
    >
      <StyledContactsButton
        type="button"
        onClick={toggleMenu}
        aria-expanded={open}
        $mobile={mobile}
      >
        {t("contacts")}
      </StyledContactsButton>

      {open && (
        <StyledContactsMenu $mobile={mobile}>
          <StyledContactsClose
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t("close")}
          >
            ×
          </StyledContactsClose>

          <StyledContactsTitle>
            {t("contacts")}
          </StyledContactsTitle>

          <StyledContactsList>
            <StyledContactsItem>
            <StyledContactsLink
  href="tel:+380999284258"
  onClick={handleLinkClick}
>
  <FaPhone />
  <span>+380 99 928 42 58</span>
</StyledContactsLink>
            </StyledContactsItem>

            <StyledContactsItem>
          <StyledContactsLink
  href="viber://chat?number=%2B380999284258"
  onClick={handleLinkClick}
>
  <FaViber />
  <span>Viber</span>
</StyledContactsLink>
            </StyledContactsItem>

            <StyledContactsItem>
            <StyledContactsLink
  href="https://t.me/kodi_transcarpathian"
  target="_blank"
  rel="noopener noreferrer"
  onClick={handleLinkClick}
>
  <FaTelegram />
  <span>Telegram</span>
</StyledContactsLink>
            </StyledContactsItem>

            <StyledContactsItem>
          <StyledContactsLink
  href="https://www.instagram.com/kodi_uzhhorod?stkn=cTF0aGxiMDlrZ3Jz"
  target="_blank"
  rel="noopener noreferrer"
  onClick={handleLinkClick}
>
  <FaInstagram />
  <span>Instagram</span>
</StyledContactsLink>
            </StyledContactsItem>
          </StyledContactsList>
        </StyledContactsMenu>
      )}
    </StyledContactsDropdown>
  );
}