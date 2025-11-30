import Head from "next/head";
import { useState } from "react";
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
import camouflageBasesKodi from "@/lib/kodi/baseKodi/camouflageBaseKodi";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const CURRENCY = "грн";

export default function CamouflageBasesPage() {
  const { t } = useTranslation("camouflageBaseKodi"); // ✅

  const [visibleCount, setVisibleCount] = useState(15);

  const visibleProducts = camouflageBasesKodi.slice(0, visibleCount);
  const total = camouflageBasesKodi.length;
  const remaining = total - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 15, total));
  };

  console.log("test:", t("camouflage.meta.title")); // ✅ має вивести твій заголовок

  return (
    <>
      <Head>
        <title>{t("camouflage.meta.title")}</title>
        <meta name="description" content={t("camouflage.meta.description")} />
      </Head>

      <Header />

      <Container>
        <h1>{t("camouflage.title")}</h1>
        <p>{t("camouflage.subtitle")}</p>

        <Grid>
          {visibleProducts.map((product) => (
            <Card key={product.id}>
              {product.image && (
                <img src={product.image} alt={t(product.subtitleKey)} />
              )}

              <h3>{t(product.titleKey)}</h3>
              <Subtitle>{t(product.subtitleKey)}</Subtitle>

              <Price>
                {product.price && (
                  <span
                    style={{
                      fontWeight: 400,
                      marginRight: "0.5rem",
                    }}
                  >
                    {product.price} {CURRENCY}
                  </span>
                )}
              </Price>

              <Button href={product.href}>{t("camouflage.buyButton")}</Button>
            </Card>
          ))}
        </Grid>

        {visibleCount < total && (
          <LoadMoreWrapper>
            <LoadMoreButton type="button" onClick={handleLoadMore}>
              {t("camouflage.loadMore", {
                count: Math.min(15, remaining),
              })}
            </LoadMoreButton>
          </LoadMoreWrapper>
        )}
      </Container>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "camouflageBaseKodi",
      ])),
    },
  };
}
