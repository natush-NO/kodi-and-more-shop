import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useCart } from "@/components/Cart/CartContext";

import PageLayout from "@/components/PageLayout/PageLayout";

import { CardImage } from "@/components/shared/Image";

import {
  StyledCheckoutPage,
  StyledCheckoutBackButton,
  StyledCheckoutTitle,
  StyledCheckoutContent,
  StyledCheckoutForm,
  StyledCheckoutFormTitle,
  StyledCheckoutField,
  StyledCheckoutLabel,
  StyledCheckoutInput,
  StyledCheckoutTextarea,
  StyledCheckoutOrder,
  StyledCheckoutOrderTitle,
  StyledCheckoutItems,
  StyledCheckoutItem,
  StyledCheckoutItemImage,
  StyledCheckoutItemInfo,
  StyledCheckoutItemName,
  StyledCheckoutItemDetails,
  StyledCheckoutItemTotal,
  StyledCheckoutSummary,
  StyledCheckoutSummaryRow,
  StyledCheckoutTotal,
  StyledCheckoutSubmitButton,
  StyledCheckoutEmpty,
} from "@/components/Cart/StyledCheckout";

export default function CheckoutPage() {
  const router = useRouter();

  const { t } = useTranslation(["common", "crystalDropsKodi"]);

  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    novaPoshta: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Збережене замовлення після успішного відправлення
  const [submittedProducts, setSubmittedProducts] = useState([]);
  const [submittedCartCount, setSubmittedCartCount] = useState(0);
  const [submittedCartTotal, setSubmittedCartTotal] = useState(0);

  // Населені пункти
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  // Відділення / поштомати
  const [warehouseSuggestions, setWarehouseSuggestions] = useState([]);
  const [warehouseLoading, setWarehouseLoading] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Якщо користувач змінює місто вручну,
    // старий вибір міста та відділення скидається.
    if (name === "city") {
      setSelectedCity(null);
      setSelectedWarehouse(null);
      setWarehouseSuggestions([]);

      setForm((prev) => ({
        ...prev,
        city: value,
        novaPoshta: "",
      }));
    }

    // Якщо користувач змінює поле відділення вручну
    if (name === "novaPoshta") {
      setSelectedWarehouse(null);
    }
  };

  // ---------------------------------------------------------
  // Пошук населених пунктів після введення першої літери
  // ---------------------------------------------------------

  useEffect(() => {
    const query = form.city.trim();

    if (selectedCity || query.length < 2) {
      setCitySuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setCityLoading(true);

      try {
        const response = await fetch("/api/nova-poshta", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "settlements",
            query,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          console.error("Nova Poshta settlements error:", data.message);

          setCitySuggestions([]);
          return;
        }

        setCitySuggestions(data.data || []);
      } catch (error) {
        console.error("Nova Poshta settlements error:", error);

        setCitySuggestions([]);
      } finally {
        setCityLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [form.city, selectedCity]);

  // ---------------------------------------------------------
  // Вибір населеного пункту
  // ---------------------------------------------------------

  const handleCitySelect = async (city) => {
    setSelectedCity(city);

    setForm((prev) => ({
      ...prev,
      city: city.name,
      novaPoshta: "",
    }));

    setCitySuggestions([]);
    setSelectedWarehouse(null);
    setWarehouseSuggestions([]);

    setWarehouseLoading(true);

    try {
      const response = await fetch("/api/nova-poshta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "warehouses",
          cityRef: city.ref,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load warehouses");
      }

      setWarehouseSuggestions(data.data || []);
    } catch (error) {
      console.error("Nova Poshta warehouses error:", error);

      setWarehouseSuggestions([]);
    } finally {
      setWarehouseLoading(false);
    }
  };

  // ---------------------------------------------------------
  // Вибір відділення
  // ---------------------------------------------------------

  const handleWarehouseSelect = (warehouse) => {
    setSelectedWarehouse(warehouse);

    setForm((prev) => ({
      ...prev,
      novaPoshta: warehouse.description,
    }));

    setWarehouseSuggestions([]);
  };

  // ---------------------------------------------------------
  // Відправлення замовлення
  // ---------------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting || isSubmitted) {
      return;
    }

    // Не дозволяємо відправити замовлення,
    // якщо місто не вибране зі списку.
    if (!selectedCity) {
      setSubmitError(t("selectCity"));
      return;
    }

    // Не дозволяємо відправити замовлення,
    // якщо відділення не вибране зі списку.
    if (!selectedWarehouse) {
      setSubmitError(t("selectWarehouse"));
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const currentProducts = [...cart];

      const currentCartCount = currentProducts.reduce(
        (total, item) => total + item.quantity,
        0,
      );

      const currentCartTotal = currentProducts.reduce(
        (total, item) => total + (item.salePrice ?? item.price) * item.quantity,
        0,
      );

      const response = await fetch("/api/send-order", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          customer: {
            ...form,
            cityRef: selectedCity.ref,
            cityName: selectedCity.name,
            warehouseRef: selectedWarehouse.ref,
            warehouseName: selectedWarehouse.description,
          },

          products: currentProducts,

          cartCount: currentCartCount,
          cartTotal: currentCartTotal,

          locale: router.locale,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Помилка відправлення");
      }

      // Зберігаємо замовлення на сторінці
      setSubmittedProducts(currentProducts);
      setSubmittedCartCount(currentCartCount);
      setSubmittedCartTotal(currentCartTotal);

      // Показуємо успішний стан
      setIsSubmitted(true);

      // Очищаємо справжній кошик
      clearCart();
    } catch (error) {
      console.error("SEND ORDER ERROR:", error);

      setSubmitError(t("submitError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------------------------------------------------
  // Назва товару
  // ---------------------------------------------------------

  const getProductName = (item) => {
    if (item.titleKey) {
      return t(item.titleKey, {
        ns: item.translationNamespace || "crystalDropsKodi",
      });
    }

    return item.name || "";
  };

  // ---------------------------------------------------------
  // Які товари показувати
  // ---------------------------------------------------------

  const displayedProducts = isSubmitted ? submittedProducts : cart;

  const displayedCartCount = isSubmitted
    ? submittedCartCount
    : cart.reduce((total, item) => total + item.quantity, 0);

  const displayedCartTotal = isSubmitted
    ? submittedCartTotal
    : cart.reduce(
        (total, item) => total + (item.salePrice ?? item.price) * item.quantity,
        0,
      );

  // ---------------------------------------------------------
  // Порожній кошик
  // ---------------------------------------------------------

  if (displayedProducts.length === 0 && !isSubmitted) {
    return (
      <PageLayout activePage="cart">
        <StyledCheckoutPage>
          <StyledCheckoutBackButton type="button" onClick={() => router.back()}>
            {t("checkoutBack")}
          </StyledCheckoutBackButton>

          <StyledCheckoutTitle>{t("checkoutTitle")}</StyledCheckoutTitle>

          <StyledCheckoutEmpty>
            <p>{t("checkoutEmpty")}</p>

            <StyledCheckoutSubmitButton
              type="button"
              onClick={() => router.push("/")}
            >
              {t("goToCatalog")}
            </StyledCheckoutSubmitButton>
          </StyledCheckoutEmpty>
        </StyledCheckoutPage>
      </PageLayout>
    );
  }

  return (
    <PageLayout activePage="cart">
      <StyledCheckoutPage>
        <StyledCheckoutBackButton type="button" onClick={() => router.back()}>
          {t("checkoutBack")}
        </StyledCheckoutBackButton>

        <StyledCheckoutTitle>{t("checkoutTitle")}</StyledCheckoutTitle>

        <StyledCheckoutContent>
          {/* ФОРМА */}

          <StyledCheckoutForm onSubmit={handleSubmit}>
            <StyledCheckoutFormTitle>
              {t("customerData")}
            </StyledCheckoutFormTitle>

            {/* Ім'я */}

            <StyledCheckoutField>
              <StyledCheckoutLabel htmlFor="name">
                {t("name")}
              </StyledCheckoutLabel>

              <StyledCheckoutInput
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder={t("namePlaceholder")}
                required
                disabled={isSubmitting || isSubmitted}
              />
            </StyledCheckoutField>

            {/* Телефон */}

            <StyledCheckoutField>
              <StyledCheckoutLabel htmlFor="phone">
                {t("phone")}
              </StyledCheckoutLabel>

              <StyledCheckoutInput
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+380..."
                required
                disabled={isSubmitting || isSubmitted}
              />
            </StyledCheckoutField>

            {/* Місто */}

            <StyledCheckoutField>
              <StyledCheckoutLabel htmlFor="city">
                {t("city")}
              </StyledCheckoutLabel>

              <div
                style={{
                  position: "relative",
                }}
              >
                <StyledCheckoutInput
                  id="city"
                  name="city"
                  type="text"
                  value={form.city}
                  onChange={handleChange}
                  placeholder={t("cityPlaceholder")}
                  required
                  autoComplete="off"
                  disabled={isSubmitting || isSubmitted}
                />

                {!selectedCity &&
                  form.city.trim().length > 0 &&
                  !isSubmitted && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        zIndex: 20,
                        maxHeight: "260px",
                        overflowY: "auto",
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderTop: "none",
                        borderRadius: "0 0 8px 8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      }}
                    >
                      {cityLoading && (
                        <div
                          style={{
                            padding: "12px 14px",
                            color: "#777",
                          }}
                        >
                          {t("loading")}
                        </div>
                      )}

                      {!cityLoading && citySuggestions.length === 0 && (
                        <div
                          style={{
                            padding: "12px 14px",
                            color: "#777",
                          }}
                        >
                          {t("nothingFound")}
                        </div>
                      )}

                      {!cityLoading &&
                        citySuggestions.map((city) => (
                          <button
                            key={city.ref}
                            type="button"
                            onClick={() => handleCitySelect(city)}
                            style={{
                              display: "block",
                              width: "100%",
                              padding: "12px 14px",
                              border: "none",
                              borderBottom: "1px solid #eee",
                              background: "#fff",
                              color: "#111",
                              textAlign: "left",
                              cursor: "pointer",
                              fontSize: "15px",
                            }}
                          >
                            {city.name}

                            {city.areaDescription
                              ? `, ${city.areaDescription}`
                              : ""}
                          </button>
                        ))}
                    </div>
                  )}
              </div>
            </StyledCheckoutField>

            {/* Нова пошта */}

            <StyledCheckoutField>
              <StyledCheckoutLabel htmlFor="novaPoshta">
                {t("novaPoshta")}
              </StyledCheckoutLabel>

              <div
                style={{
                  position: "relative",
                }}
              >
                <StyledCheckoutInput
                  id="novaPoshta"
                  name="novaPoshta"
                  type="text"
                  value={form.novaPoshta}
                  placeholder={
                    selectedCity
                      ? t("novaPoshtaPlaceholder")
                      : t("selectCityFirst")
                  }
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  disabled={!selectedCity || isSubmitting || isSubmitted}
                />

                {selectedCity && !selectedWarehouse && !isSubmitted && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      zIndex: 20,
                      maxHeight: "260px",
                      overflowY: "auto",
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderTop: "none",
                      borderRadius: "0 0 8px 8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  >
                    {warehouseLoading && (
                      <div
                        style={{
                          padding: "12px 14px",
                          color: "#777",
                        }}
                      >
                        {t("loading")}
                      </div>
                    )}

                    {!warehouseLoading && warehouseSuggestions.length === 0 && (
                      <div
                        style={{
                          padding: "12px 14px",
                          color: "#777",
                        }}
                      >
                        {t("nothingFound")}
                      </div>
                    )}

                    {!warehouseLoading &&
                      warehouseSuggestions.map((warehouse) => (
                        <button
                          key={warehouse.ref}
                          type="button"
                          onClick={() => handleWarehouseSelect(warehouse)}
                          style={{
                            display: "block",
                            width: "100%",
                            padding: "12px 14px",
                            border: "none",
                            borderBottom: "1px solid #eee",
                            background: "#fff",
                            color: "#111",
                            textAlign: "left",
                            cursor: "pointer",
                            fontSize: "15px",
                          }}
                        >
                          {warehouse.description}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </StyledCheckoutField>

            {/* Коментар */}

            <StyledCheckoutField>
              <StyledCheckoutLabel htmlFor="comment">
                {t("comment")}
              </StyledCheckoutLabel>

              <StyledCheckoutTextarea
                id="comment"
                name="comment"
                value={form.comment}
                onChange={handleChange}
                placeholder={t("commentPlaceholder")}
                rows={5}
                disabled={isSubmitting || isSubmitted}
              />
            </StyledCheckoutField>

            {/* КНОПКА */}

            <StyledCheckoutSubmitButton
              type="submit"
              disabled={isSubmitting || isSubmitted}
              $submitted={isSubmitted}
            >
              {isSubmitted
                ? t("submitted")
                : isSubmitting
                  ? t("submitting")
                  : t("submit")}
            </StyledCheckoutSubmitButton>

            {submitError && (
              <p
                style={{
                  color: "#e11d48",
                  marginTop: "15px",
                }}
              >
                {submitError}
              </p>
            )}
          </StyledCheckoutForm>

          {/* ЗАМОВЛЕННЯ */}

          <StyledCheckoutOrder>
            <StyledCheckoutOrderTitle>
              {t("yourOrder")}
            </StyledCheckoutOrderTitle>

            <StyledCheckoutItems>
              {displayedProducts.map((item) => {
                const itemPrice = item.salePrice ?? item.price;

                const itemTotal = itemPrice * item.quantity;

                const productName = getProductName(item);

                return (
                  <StyledCheckoutItem key={item.id}>
                    <StyledCheckoutItemImage>
                      <CardImage src={item.image} alt={productName} fill />
                    </StyledCheckoutItemImage>

                    <StyledCheckoutItemInfo>
                      <StyledCheckoutItemName>
                        {productName}
                      </StyledCheckoutItemName>

                      <StyledCheckoutItemDetails>
                        {itemPrice} {t("currency")} × {item.quantity}
                      </StyledCheckoutItemDetails>

                      <StyledCheckoutItemTotal>
                        {itemTotal} {t("currency")}
                      </StyledCheckoutItemTotal>
                    </StyledCheckoutItemInfo>
                  </StyledCheckoutItem>
                );
              })}
            </StyledCheckoutItems>

            <StyledCheckoutSummary>
              <StyledCheckoutSummaryRow>
                <span>{t("checkoutItems")}</span>

                <span>{displayedCartCount}</span>
              </StyledCheckoutSummaryRow>

              <StyledCheckoutTotal>
                <span>{t("checkoutTotal")}</span>

                <span>
                  {displayedCartTotal} {t("currency")}
                </span>
              </StyledCheckoutTotal>
            </StyledCheckoutSummary>
          </StyledCheckoutOrder>
        </StyledCheckoutContent>
      </StyledCheckoutPage>
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
