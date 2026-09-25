import { useTranslation } from "next-i18next";

import {
  StyledMain,
  StyledMainContainer,
  StyledPageTitle,
  StyledContentHeader,
  StyledContentTitle,
  StyledContentTitleAccent,
  StyledContentSubtitle,
} from "./StyledPageLayout";

export default function PageLayout({ children, title }) {
  const { t } = useTranslation(["common"]);

  return (
    <StyledMain>
      <StyledMainContainer>
        {title && <StyledPageTitle>{title}</StyledPageTitle>}

        {children}
      </StyledMainContainer>
    </StyledMain>
  );
}
