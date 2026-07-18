import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import { StyledMain, StyledMainContainer } from "@/components/StyledIndex";
import {
  StyledKodiListItems,
  StyledKodiList,
  StyledTitlePegeKodi,
} from "@/components/Kodi/StyledCartItem";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

export default function KodiPage({ kodiCatalog }) {
  const { t } = useTranslation(["categoriesBeauty", "common"]);

  const [shuffledCatalog, setShuffledCatalog] = useState([]);

  useEffect(() => {
    const shuffled = [...kodiCatalog].sort(() => Math.random() - 0.5);
    setShuffledCatalog(shuffled);
  }, [kodiCatalog]);

  return (
    <>
      <Header kodiPage />

      <StyledMain>
        <StyledMainContainer>
          <StyledKodiListItems>
            {shuffledCatalog.map((cat) => (
              <StyledKodiList key={cat.id}>
                <Link href={cat.route}>
                  <StyledTitlePegeKodi>
                    {t(cat.nameKey, { ns: "categoriesBeauty" })}
                  </StyledTitlePegeKodi>
                </Link>
              </StyledKodiList>
            ))}
          </StyledKodiListItems>
        </StyledMainContainer>
      </StyledMain>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const { default: kodiCatalog } = await import("@/lib/kodi/kodiCatalog");

  return {
    props: {
      kodiCatalog,
      ...(await serverSideTranslations(locale, ["common", "categoriesBeauty"])),
    },
  };
}
