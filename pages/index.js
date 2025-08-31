import Header from "@/components/Header/Header";

import {
  StyledMain,
  StyledMainContainer,
  StyledBrandsTitle,
  StyledBrandsList,
  StyledBrandItem,
  StyledBrandLink,
} from "@/components/StyledIndex";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function HomePage({
  changeLanguage,
  isCatalogOpen,
  setIsCatalogOpen,
  toggleCatalog,
  closeCatalog,
  brandsCatalog,
}) {
  const { t } = useTranslation(["common", "brandsCatalog"]);

  return (
    <>
      <Header
        changeLanguage={changeLanguage}
        isCatalogOpen={isCatalogOpen}
        setIsCatalogOpen={setIsCatalogOpen}
        closeCatalog={closeCatalog}
        toggleCatalog={toggleCatalog}
        brandsCatalog={brandsCatalog}
      />

      <StyledMain>
        <StyledMainContainer>
          <StyledBrandsTitle>Бренди</StyledBrandsTitle>

          <StyledBrandsList>
            {brandsCatalog.map((cat) => {
              const href =
                cat.route && cat.route !== "#"
                  ? cat.route
                  : `/brandsCatalog/${cat.id}`;

              const label = cat.nameKey
                ? t(cat.nameKey, {
                    ns: "brandsCatalog",
                    defaultValue: cat.name ?? cat.id,
                  })
                : cat.name;

              return (
                <StyledBrandItem key={cat.id}>
                  <StyledBrandLink href={href}>{label}</StyledBrandLink>
                </StyledBrandItem>
              );
            })}
          </StyledBrandsList>
        </StyledMainContainer>
      </StyledMain>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const { default: brandsCatalog } = await import("@/lib/brandsCatalog");

  return {
    props: {
      brandsCatalog,
      ...(await serverSideTranslations(locale, ["common", "brandsCatalog"])),
    },
    revalidate: 60,
  };
}
