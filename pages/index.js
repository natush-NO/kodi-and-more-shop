import Header from "@/components/Header/Header";
import { StyledBackgroundImgBody } from "@/components/StyledBackgroundImgBody";

import {
  StyledMain,
  StyledMainContainer,
  StyledBrandsTitle,
  StyledBrandsList,
  StyledBrandItem,
  StyledBrandLink,
} from "@/components/StyledIndex";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function HomePage({
  // showAboutMe,
  setShowAboutMe,
  // handleShowText,
  changeLanguage,
  isCatalogOpen,
  setIsCatalogOpen,
  toggleCatalog,
  closeCatalog,
}) {
  // function closeModal() {
  //   setShowAboutMe(false);

  //   setTimeout(() => {
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     });
  //   }, 0);
  // }

  return (
    <>
      <StyledBackgroundImgBody>
        <Header
          // isBack={false}
          changeLanguage={changeLanguage}
          isCatalogOpen={isCatalogOpen}
          setIsCatalogOpen={setIsCatalogOpen}
          toggleCatalog={toggleCatalog}
          closeCatalog={closeCatalog}
        />
        <StyledMain>
          <StyledMainContainer>
            <StyledBrandsTitle>Бренди</StyledBrandsTitle>

            <StyledBrandsList>
              <StyledBrandItem>
                <StyledBrandLink href="/brands/kodi">Kodi</StyledBrandLink>
              </StyledBrandItem>
              <StyledBrandItem>
                <StyledBrandLink href="/brands/yo-nails">
                  YO!Nails
                </StyledBrandLink>
              </StyledBrandItem>
              <StyledBrandItem>
                <StyledBrandLink href="/brands/dis">D.I.S</StyledBrandLink>
              </StyledBrandItem>
              <StyledBrandItem>
                <StyledBrandLink href="/brands/nub">Nub</StyledBrandLink>
              </StyledBrandItem>
              <StyledBrandItem>
                <StyledBrandLink href="/brands/edlen">Edlen</StyledBrandLink>
              </StyledBrandItem>
              <StyledBrandItem>
                <StyledBrandLink href="/brands/baby-moon">
                  Baby Moon
                </StyledBrandLink>
              </StyledBrandItem>
              <StyledBrandItem>
                <StyledBrandLink href="/brands/divia">Divia</StyledBrandLink>
              </StyledBrandItem>
              <StyledBrandItem>
                <StyledBrandLink href="/brands/nailapex">
                  NailApex
                </StyledBrandLink>
              </StyledBrandItem>
              <StyledBrandItem>
                <StyledBrandLink href="/brands/staleks">
                  Staleks
                </StyledBrandLink>
              </StyledBrandItem>
              <StyledBrandItem>
                <StyledBrandLink href="/brands/antiseptics">
                  Антисептики / Дезінфектори
                </StyledBrandLink>
              </StyledBrandItem>
              <StyledBrandItem>
                <StyledBrandLink href="/brands/drills">Фрези</StyledBrandLink>
              </StyledBrandItem>
            </StyledBrandsList>
          </StyledMainContainer>
        </StyledMain>
      </StyledBackgroundImgBody>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
