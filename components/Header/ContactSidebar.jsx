import { useTranslation } from "next-i18next";

import {
  FaPhone,
  FaInstagram,
  FaWhatsapp,
  FaTelegram,
  FaViber,
} from "react-icons/fa6";

import {
  StyledContactsSidebar,
  StyledContactsItem,
  StyledContactsLink,
  StyledContactsText,
} from "./StyledHeader";

export default function ContactSidebar() {
  const { t } = useTranslation("common");

  return (
    <StyledContactsSidebar>

      <StyledContactsItem>
        <StyledContactsLink
          href="tel:+380999284258"
          $type="phone"
          aria-label="Телефон"
        >
          <StyledContactsText>Телефон</StyledContactsText>
          <FaPhone />
        </StyledContactsLink>
      </StyledContactsItem>

      <StyledContactsItem>
        <StyledContactsLink
          href="https://www.instagram.com/kodi_uzhhorod?stkn=cTF0aGxiMDlrZ3Jz"
          target="_blank"
          rel="noopener noreferrer"
          $type="instagram"
          aria-label="Instagram"
        >
          <StyledContactsText>Instagram</StyledContactsText>
          <FaInstagram />
        </StyledContactsLink>
      </StyledContactsItem>

      <StyledContactsItem>
        <StyledContactsLink
          href="https://wa.me/380999284258"
          target="_blank"
          rel="noopener noreferrer"
          $type="whatsapp"
          aria-label="WhatsApp"
        >
          <StyledContactsText>WhatsApp</StyledContactsText>
          <FaWhatsapp />
        </StyledContactsLink>
      </StyledContactsItem>

      <StyledContactsItem>
        <StyledContactsLink
          href="https://t.me/kodi_transcarpathian"
          target="_blank"
          rel="noopener noreferrer"
          $type="telegram"
          aria-label="Telegram"
        >
          <StyledContactsText>Telegram</StyledContactsText>
          <FaTelegram />
        </StyledContactsLink>
      </StyledContactsItem>

      <StyledContactsItem>
        <StyledContactsLink
          href="viber://chat?number=%2B380999284258"
          $type="viber"
          aria-label="Viber"
        >
          <StyledContactsText>Viber</StyledContactsText>
          <FaViber />
        </StyledContactsLink>
      </StyledContactsItem>

    </StyledContactsSidebar>
  );
}