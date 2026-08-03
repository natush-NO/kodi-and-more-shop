import Header from "@/components/Header/Header";
import {
  StyledMain,
  StyledMainContainer,
  StyledPageTitle,
} from "./StyledPageLayout";

export default function PageLayout({ children, title, activePage }) {
  return (
    <>
      <Header activePage={activePage} />

      <StyledMain>
        <StyledMainContainer>
          {title && <StyledPageTitle>{title}</StyledPageTitle>}

          {children}
        </StyledMainContainer>
      </StyledMain>
    </>
  );
}
