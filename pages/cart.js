import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useCart } from "@/components/Cart/CartContext";

import PageLayout from "@/components/PageLayout/PageLayout";

import { CardImage } from "@/components/shared/Image";

import {
  StyledCartPage,
  StyledCartTitle,
  StyledCartContent,
  StyledCartItems,
  StyledCartItem,
  StyledCartItemImage,
  StyledCartItemInfo,
  StyledCartItemTitle,
  StyledCartItemArticle,
  StyledCartItemPrice,
  StyledCartQuantity,
  StyledCartQuantityButton,
  StyledCartQuantityValue,
  StyledCartRemoveButton,
  StyledCartSummary,
  StyledCartSummaryTitle,
  StyledCartSummaryRow,
  StyledCartTotal,
  StyledCartClearButton,
  StyledCartCheckoutButton,
  StyledCartEmpty,
  StyledCartBackButton,
} from "@/components/Cart/StyledCart";

export default function CartPage() {
  const router = useRouter();

  const { t } = useTranslation(["common", "crystalDropsKodi"]);

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
  } = useCart();

  const handleBack = () => {
    router.back();
  };

  const getProductName = (item) => {
    if (item.titleKey) {
      return t(item.titleKey, {
        ns: item.translationNamespace || "crystalDropsKodi",
      });
    }

    return item.name || "";
  };

  return (
    <PageLayout activePage="cart">
      <StyledCartPage>
        <StyledCartBackButton type="button" onClick={handleBack}>
          {t("back")}
        </StyledCartBackButton>

        <StyledCartTitle>{t("title")}</StyledCartTitle>

        {cart.length === 0 ? (
          <StyledCartEmpty>
            <p>{t("empty")}</p>
          </StyledCartEmpty>
        ) : (
          <StyledCartContent>
            <StyledCartItems>
              {cart.map((item) => {
                const itemPrice = item.salePrice ?? item.price;

                const productName = getProductName(item);

                return (
                  <StyledCartItem key={item.id}>
                    <StyledCartItemImage>
                      <CardImage src={item.image} alt={productName} fill />
                    </StyledCartItemImage>

                    <StyledCartItemInfo>
                      <StyledCartItemTitle>{productName}</StyledCartItemTitle>

                      <StyledCartItemArticle>
                        {t("article")} {item.article}
                      </StyledCartItemArticle>

                      <StyledCartItemPrice>{itemPrice} грн</StyledCartItemPrice>

                      <StyledCartQuantity>
                        <StyledCartQuantityButton
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          −
                        </StyledCartQuantityButton>

                        <StyledCartQuantityValue>
                          {item.quantity}
                        </StyledCartQuantityValue>

                        <StyledCartQuantityButton
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </StyledCartQuantityButton>
                      </StyledCartQuantity>

                      <StyledCartRemoveButton
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        {t("remove")}
                      </StyledCartRemoveButton>
                    </StyledCartItemInfo>
                  </StyledCartItem>
                );
              })}
            </StyledCartItems>

            <StyledCartSummary>
              <StyledCartSummaryTitle>{t("order")}</StyledCartSummaryTitle>

              <StyledCartSummaryRow>
                <span>{t("items")}</span>
                <span>{cartCount}</span>
              </StyledCartSummaryRow>

              <StyledCartTotal>
                <span>{t("total")}</span>
                <span>{cartTotal} грн</span>
              </StyledCartTotal>

              <StyledCartCheckoutButton
                type="button"
                onClick={() => router.push("/checkout")}
              >
                {t("checkout")}
              </StyledCartCheckoutButton>

              <StyledCartClearButton type="button" onClick={clearCart}>
                {t("clear")}
              </StyledCartClearButton>
            </StyledCartSummary>
          </StyledCartContent>
        )}
      </StyledCartPage>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "crystalDropsKodi"])),
    },
  };
}
