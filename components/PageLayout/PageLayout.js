import {
  StyledMain,
  StyledMainContainer,
  StyledPageTitle,
} from "./StyledPageLayout";

export default function PageLayout({ children, title }) {
  return (
    <>
      <StyledMain>
        <StyledMainContainer>
          {title && <StyledPageTitle>{title}</StyledPageTitle>}
          {children}
        </StyledMainContainer>
      </StyledMain>
    </>
  );
}
