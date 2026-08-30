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
    address: "",
    comment: "",
  });

  const [deliveryType, setDeliveryType] = useState("novaPoshta");

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

    if (selectedCity || query.length < 1) {
      setCitySuggestions([]);
      setCityLoading(false);
      return;
    }

    const controller = new AbortController();

    const loadCities = async () => {
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
          signal: controller.signal,
        });

        const data = await response.json();

        console.log("NOVA POSHTA RESPONSE:", data);

        if (!response.ok || !data.success) {
          console.error("Nova Poshta settlements error:", data.message);

          setCitySuggestions([]);
          return;
        }

        setCitySuggestions(data.data || []);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("Nova Poshta settlements error:", error);

        setCitySuggestions([]);
      } finally {
        if (!controller.signal.aborted) {
          setCityLoading(false);
        }
      }
    };

    loadCities();

    return () => {
      controller.abort();
    };
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

    // Для адресної доставки відділення не потрібно.
    // Але список відділень завантажуємо заздалегідь,
    // щоб при перемиканні на Нову пошту воно вже було готове.

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
  // Вибір способу доставки
  // ---------------------------------------------------------

  const handleDeliveryTypeChange = (type) => {
    setDeliveryType(type);
    setSubmitError("");

    if (type === "novaPoshta") {
      setForm((prev) => ({
        ...prev,
        address: "",
      }));
    }

    if (type === "address") {
      setSelectedWarehouse(null);

      setForm((prev) => ({
        ...prev,
        novaPoshta: "",
      }));
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

    // Місто обов'язково повинно бути вибране зі списку.
    if (!selectedCity) {
      setSubmitError(t("selectCity"));
      return;
    }

    // Якщо Нова пошта — обов'язково вибрати відділення.
    if (deliveryType === "novaPoshta" && !selectedWarehouse) {
      setSubmitError(t("selectWarehouse"));
      return;
    }

    // Якщо адресна доставка — обов'язково вказати адресу.
    if (deliveryType === "address" && !form.address.trim()) {
      setSubmitError("Вкажіть адресу доставки");
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

            deliveryType,

            cityRef: selectedCity.ref,
            cityName: selectedCity.name,

            warehouseRef:
              deliveryType === "novaPoshta" ? selectedWarehouse?.ref || "" : "",

            warehouseName:
              deliveryType === "novaPoshta"
                ? selectedWarehouse?.description || ""
                : "",

            deliveryAddress:
              deliveryType === "address" ? form.address.trim() : "",
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

            {/* СПОСІБ ОТРИМАННЯ */}

            <StyledCheckoutField>
              <StyledCheckoutLabel>Спосіб отримання</StyledCheckoutLabel>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginTop: "4px",
                }}
              >
                {/* Нова пошта */}

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    width: "fit-content",
                  }}
                >
                  <input
                    type="radio"
                    name="deliveryType"
                    value="novaPoshta"
                    checked={deliveryType === "novaPoshta"}
                    onChange={() => handleDeliveryTypeChange("novaPoshta")}
                    disabled={isSubmitting || isSubmitted}
                    style={{
                      width: "18px",
                      minWidth: "18px",
                      height: "18px",
                      margin: 0,
                      padding: 0,
                      cursor: "pointer",
                    }}
                  />

                  <span>Відділення / поштомат Нової пошти</span>
                </label>

                {/* Адресна доставка */}

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    width: "fit-content",
                  }}
                >
                  <input
                    type="radio"
                    name="deliveryType"
                    value="address"
                    checked={deliveryType === "address"}
                    onChange={() => handleDeliveryTypeChange("address")}
                    disabled={isSubmitting || isSubmitted}
                    style={{
                      width: "18px",
                      minWidth: "18px",
                      height: "18px",
                      margin: 0,
                      padding: 0,
                      cursor: "pointer",
                    }}
                  />

                  <span>Адресна доставка</span>
                </label>
              </div>
            </StyledCheckoutField>

            {/* НОВА ПОШТА */}

            {deliveryType === "novaPoshta" && (
              <StyledCheckoutField>
                <StyledCheckoutLabel htmlFor="novaPoshta">
                  Відділення / поштомат Нової пошти
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

                      {!warehouseLoading &&
                        warehouseSuggestions.length === 0 && (
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
            )}

            {/* АДРЕСНА ДОСТАВКА */}

            {deliveryType === "address" && (
              <StyledCheckoutField>
                <StyledCheckoutLabel htmlFor="address">
                  Адреса доставки
                </StyledCheckoutLabel>

                <StyledCheckoutInput
                  id="address"
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Вулиця, будинок, квартира"
                  required
                  disabled={isSubmitting || isSubmitted}
                />
              </StyledCheckoutField>
            )}

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
