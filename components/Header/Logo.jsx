import { useTranslation } from "next-i18next";

import {
  StyledLogo,
  StyledLogoTitle,
  StyledLogoHeart,
  StyledLogoSubtitle,
} from "./StyledHeader";

export default function Logo() {
  const { t } = useTranslation("common");

  return (
    <StyledLogo>
      <StyledLogoTitle>
        more
        <StyledLogoHeart>♥</StyledLogoHeart>
      </StyledLogoTitle>

      <StyledLogoSubtitle>
        {t("beautyShop")}
      </StyledLogoSubtitle>
    </StyledLogo>
  );
}