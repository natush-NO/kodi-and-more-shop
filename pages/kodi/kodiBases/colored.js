import Image from "next/image";
import Head from "next/head";
import Header from "@/components/Header/Header";

import {
  Container,
  Grid,
  Card,
  Subtitle,
  Price,
  Button,
  LoadMoreWrapper,
  LoadMoreButton,
} from "@/components/Kodi/kodiBases/StyledTransparentBaseKodi";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { colorBasesKodi } from "@/lib/kodi/baseKodi/colorBasesKodi";

const CURRENCY = "грн";

export default function ColoredBasesPage() {
  const { t } = useTranslation("colorBasesKodi");

  // якщо хочеш "load more" як на camouflage:
  // const [visibleCount, setVisibleCount] = useState(15);
  // const visibleProducts = colorBasesKodi.slice(0, visibleCount);
  // const total = colorBasesKodi.length;
  // const remaining = total - visibleCount;

  return (
    <>
      <Head>
        <title>{t("colorBasesKodi.title")} | Kodi and More</title>
      </Head>

      <Header kodiPage />

      <Container>
        <h1>{t("colorBasesKodi.title")}</h1>

        <Grid>
          {colorBasesKodi.map((base) => (
            <Card key={base.id}>
              {base.image && (
                <Image
                  src={base.image}
                  alt={t(base.nameKey)}
                  width={320}
                  height={320}
                  style={{ width: "100%", height: "auto" }} // щоб гарно вписувалось у Card
                />
              )}

              <h3>{t(base.nameKey)}</h3>

              {/* якщо у тебе є підзаголовок/опис ключем — підстав сюди,
                  інакше можеш прибрати Subtitle */}
              {base.subtitleKey && <Subtitle>{t(base.subtitleKey)}</Subtitle>}

              <Price>
                <span style={{ fontWeight: 400, marginRight: "0.5rem" }}>
                  {base.price} {CURRENCY}
                </span>
              </Price>
              {base.href && <Button href={base.href}>{t("buyButton")}</Button>}
            </Card>
          ))}
        </Grid>

        {/* якщо хочеш "load more" як на camouflage — розкоментуй блок нижче */}
        {/*
        {visibleCount < total && (
          <LoadMoreWrapper>
            <LoadMoreButton
              type="button"
              onClick={() =>
                setVisibleCount((prev) => Math.min(prev + 15, total))
              }
            >
              {t("loadMore", { count: Math.min(15, remaining) })}
            </LoadMoreButton>
          </LoadMoreWrapper>
        )}
        */}
      </Container>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "colorBasesKodi",
        "brandsCatalog",
        "categoriesBeauty",
        "kodiNailsCollections",
      ])),
    },
  };
}
