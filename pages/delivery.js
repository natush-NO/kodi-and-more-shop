import { useTranslation } from "next-i18next";

import PageLayout from "@/components/PageLayout/PageLayout";

import {
  StyledDeliveryPage,
  StyledDeliverySection,
  StyledDeliveryTitle,
  StyledDeliveryText,
  StyledDeliveryList,
  StyledDeliveryItem,
} from "@/components/Delivery/StyledDelivery";

import getPageTranslations from "@/lib/i18n/getPageTranslations";

export default function DeliveryPage() {
  const { t } = useTranslation("delivery");

  return (
    <PageLayout title={t("title")}>
      <StyledDeliveryPage>
        <StyledDeliverySection>
          <StyledDeliveryTitle>{t("novaPoshta.title")}</StyledDeliveryTitle>

          <StyledDeliveryText>{t("novaPoshta.description")}</StyledDeliveryText>

          <StyledDeliveryList>
            <StyledDeliveryItem>
              {t("novaPoshta.department")}
            </StyledDeliveryItem>

            <StyledDeliveryItem>{t("novaPoshta.postomat")}</StyledDeliveryItem>
          </StyledDeliveryList>
        </StyledDeliverySection>

        <StyledDeliverySection>
          <StyledDeliveryTitle>{t("payment.title")}</StyledDeliveryTitle>

          <StyledDeliveryText>{t("payment.description")}</StyledDeliveryText>
        </StyledDeliverySection>

        <StyledDeliverySection>
          <StyledDeliveryTitle>{t("terms.title")}</StyledDeliveryTitle>

          <StyledDeliveryText>{t("terms.description")}</StyledDeliveryText>
        </StyledDeliverySection>
      </StyledDeliveryPage>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: await getPageTranslations(locale, ["delivery"]),
  };
}
