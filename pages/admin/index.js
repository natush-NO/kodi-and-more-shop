import { useEffect, useState } from "react";
import { getSession } from "@/lib/session";

export default function AdminPage() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [activeTab, setActiveTab] = useState("products");

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [cancelling, setCancelling] = useState({});
  const [statusUpdating, setStatusUpdating] = useState({});
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [orderSearch, setOrderSearch] = useState("");
  const [dateSort, setDateSort] = useState("newest");

  const brands = [...new Set(products.map((product) => product.brand))];
  const categories = [...new Set(products.map((product) => product.category))];

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;

    const searchValue = orderSearch.trim().toLowerCase();

    const normalizedSearch = searchValue.replace(/\D/g, "");

    const normalizedPhone = (order.phone || "").replace(/\D/g, "");

    const matchesSearch =
      !searchValue ||
      order.customerName?.toLowerCase().includes(searchValue) ||
      normalizedPhone.includes(normalizedSearch) ||
      order.id?.toLowerCase().includes(searchValue);

    return matchesStatus && matchesSearch;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return dateSort === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Статистика замовлень
  const totalOrders = orders.length;

  const newOrdersCount = orders.filter(
    (order) => order.status === "NEW",
  ).length;

  const cancelledOrdersCount = orders.filter(
    (order) => order.status === "CANCELLED",
  ).length;

  // Загальна сума замовлень без скасованих
  const totalSales = orders
    .filter((order) => order.status !== "CANCELLED")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  // Завантаження товарів
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Не вдалося завантажити товари");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Пошук та фільтрація товарів
  const filteredProducts = products.filter((product) => {
    const searchValue = search.trim().toLowerCase();

    const matchesSearch =
      String(product.id).toLowerCase().includes(searchValue) ||
      String(product.barcode).toLowerCase().includes(searchValue) ||
      String(product.collection).toLowerCase().includes(searchValue) ||
      String(product.category).toLowerCase().includes(searchValue);

    const matchesBrand =
      selectedBrand === "all" || product.brand === selectedBrand;

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesBrand && matchesCategory;
  });

  // Зміна полів товару
  function handleChange(id, field, value) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [field]: value } : product,
      ),
    );
  }

  // Збереження товару в PostgreSQL
  async function handleSave(product) {
    setSaving((prev) => ({
      ...prev,
      [product.id]: true,
    }));

    setMessage("");
    setError("");

    try {
      if (!Number.isInteger(product.price) || product.price < 0) {
        throw new Error("Введи коректну звичайну ціну");
      }

      if (
        !Number.isInteger(product.stockQuantity) ||
        product.stockQuantity < 0
      ) {
        throw new Error("Кількість товару має бути цілим числом від 0");
      }

      const salePrice =
        product.salePrice === "" || product.salePrice === undefined
          ? null
          : product.salePrice;

      if (
        salePrice !== null &&
        (!Number.isInteger(salePrice) || salePrice < 0)
      ) {
        throw new Error("Введи коректну акційну ціну");
      }

      if (salePrice !== null && salePrice >= product.price) {
        throw new Error("Акційна ціна має бути нижчою за звичайну");
      }

      const response = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: product.price,
          salePrice,
          stockQuantity: product.stockQuantity,
        }),
      });

      const updatedProduct = await response.json();

      if (!response.ok) {
        throw new Error(updatedProduct.message || "Не вдалося зберегти товар");
      }

      setProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.id === updatedProduct.id ? updatedProduct : item,
        ),
      );

      setMessage(`Товар ${product.id} успішно оновлено`);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving((prev) => ({
        ...prev,
        [product.id]: false,
      }));
    }
  }

  // Завантаження замовлень
  async function fetchOrders() {
    setOrdersLoading(true);
    setOrdersError("");

    try {
      const response = await fetch("/api/orders");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Не вдалося завантажити замовлення");
      }

      setOrders(data);
    } catch (error) {
      setOrdersError(error.message);
    } finally {
      setOrdersLoading(false);
    }
  }

  const statusLabels = {
    NEW: "Нове",
    CONFIRMED: "Підтверджене",
    SHIPPED: "Відправлене",
    COMPLETED: "Завершене",
    CANCELLED: "Скасоване",
  };

  async function handleStatusChange(orderId, status) {
    setOrdersError("");

    setStatusUpdating((prev) => ({
      ...prev,
      [orderId]: true,
    }));

    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Не вдалося змінити статус");
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, status: data.order.status }
            : order,
        ),
      );

      setMessage("Статус замовлення успішно змінено.");
    } catch (error) {
      setOrdersError(error.message);
    } finally {
      setStatusUpdating((prev) => ({
        ...prev,
        [orderId]: false,
      }));
    }
  }

  // Скасування замовлення
  async function handleCancelOrder(orderId) {
    const confirmed = window.confirm(
      "Скасувати замовлення? Товари повернуться на склад.",
    );

    if (!confirmed) return;

    setCancelling((prev) => ({
      ...prev,
      [orderId]: true,
    }));

    setOrdersError("");
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/orders/${orderId}/cancel`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Не вдалося скасувати замовлення");
      }

      setMessage("Замовлення скасовано. Товари повернуто на склад.");

      // Оновлюємо замовлення
      await fetchOrders();

      // Оновлюємо залишки товарів
      const productsResponse = await fetch("/api/products");

      if (!productsResponse.ok) {
        throw new Error("Не вдалося оновити залишки товарів");
      }

      const productsData = await productsResponse.json();
      setProducts(productsData);
    } catch (error) {
      setOrdersError(error.message);
    } finally {
      setCancelling((prev) => ({
        ...prev,
        [orderId]: false,
      }));
    }
  }

  // Вихід з адмінпанелі
  async function handleLogout() {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Не вдалося вийти з адмінпанелі");
      }

      window.location.href = "/admin/login";
    } catch (error) {
      setError(error.message);
    }
  }

  // Завантаження товарів
  if (loading) {
    return <p>Завантаження товарів...</p>;
  }

  return (
    <main style={{ padding: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <h1>Адміністративна панель</h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            background: "#b42318",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Вийти
        </button>
      </div>

      {/* Вкладки */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          margin: "25px 0",
          borderBottom: "1px solid #ddd",
          paddingBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setActiveTab("products")}
          style={{
            padding: "12px 22px",
            background: activeTab === "products" ? "#222" : "#eee",
            color: activeTab === "products" ? "#fff" : "#222",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Товари
        </button>

        <button
          onClick={() => {
            setActiveTab("orders");

            if (filteredOrders.length === 0) {
              fetchOrders();
            }
          }}
          style={{
            padding: "12px 22px",
            background: activeTab === "orders" ? "#222" : "#eee",
            color: activeTab === "orders" ? "#fff" : "#222",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Замовлення
        </button>
      </div>

      {message && (
        <p style={{ color: "green", marginBottom: "15px" }}>{message}</p>
      )}

      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      {/* ВКЛАДКА ТОВАРИ */}
      {activeTab === "products" && (
        <section>
          <h2>Товари</h2>

          <p>Усього товарів: {products.length}</p>

          {/* Пошук */}
          <div style={{ marginBottom: "25px" }}>
            <input
              type="text"
              placeholder="Пошук за ID, штрихкодом або колекцією..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{
                width: "100%",
                maxWidth: "450px",
                padding: "12px",
                fontSize: "15px",
              }}
            />

            {/* Фільтри */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "12px",
                flexWrap: "wrap",
              }}
            >
              <select
                value={selectedBrand}
                onChange={(event) => setSelectedBrand(event.target.value)}
              >
                <option value="all">Усі бренди</option>

                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                <option value="all">Усі категорії</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <p>Знайдено товарів: {filteredProducts.length}</p>
          </div>

          {/* Таблиця товарів */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: "12px" }}>ID</th>
                  <th style={{ padding: "12px" }}>Штрихкод</th>
                  <th style={{ padding: "12px" }}>Ціна, грн</th>
                  <th style={{ padding: "12px" }}>Акційна ціна</th>
                  <th style={{ padding: "12px" }}>Кількість на складі</th>
                  <th style={{ padding: "12px" }}>Дія</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td style={{ padding: "12px" }}>{product.id}</td>

                    <td style={{ padding: "12px" }}>{product.barcode}</td>

                    {/* Звичайна ціна */}
                    <td style={{ padding: "12px" }}>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={product.price}
                        onChange={(event) =>
                          handleChange(
                            product.id,
                            "price",
                            event.target.value === ""
                              ? ""
                              : Number(event.target.value),
                          )
                        }
                        style={{
                          width: "85px",
                          padding: "7px",
                        }}
                      />
                    </td>

                    {/* Акційна ціна */}
                    <td style={{ padding: "12px" }}>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="Без акції"
                        value={product.salePrice ?? ""}
                        onChange={(event) =>
                          handleChange(
                            product.id,
                            "salePrice",
                            event.target.value === ""
                              ? ""
                              : Number(event.target.value),
                          )
                        }
                        style={{
                          width: "100px",
                          padding: "7px",
                        }}
                      />
                    </td>

                    {/* Залишок */}
                    <td style={{ padding: "12px" }}>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={product.stockQuantity ?? 0}
                        onChange={(event) =>
                          handleChange(
                            product.id,
                            "stockQuantity",
                            event.target.value === ""
                              ? ""
                              : Number(event.target.value),
                          )
                        }
                        style={{
                          width: "85px",
                          padding: "7px",
                        }}
                      />

                      <div
                        style={{
                          fontSize: "12px",
                          marginTop: "5px",
                          color: product.stockQuantity > 0 ? "green" : "red",
                        }}
                      >
                        {product.stockQuantity > 0
                          ? "Є в наявності"
                          : "Немає в наявності"}
                      </div>
                    </td>

                    {/* Збереження */}
                    <td style={{ padding: "12px" }}>
                      <button
                        onClick={() => handleSave(product)}
                        disabled={saving[product.id]}
                      >
                        {saving[product.id] ? "Збереження..." : "Зберегти"}
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ padding: "20px" }}>
                      Товарів не знайдено
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ВКЛАДКА ЗАМОВЛЕННЯ */}
      {activeTab === "orders" && (
        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <h2>Замовлення</h2>
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "15px",
              }}
            >
              {[
                { value: "ALL", label: "Усі" },
                { value: "NEW", label: "Нові" },
                { value: "CONFIRMED", label: "Підтверджені" },
                { value: "SHIPPED", label: "Відправлені" },
                { value: "COMPLETED", label: "Завершені" },
                { value: "CANCELLED", label: "Скасовані" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  style={{
                    padding: "9px 14px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    background: statusFilter === filter.value ? "#222" : "#eee",
                    color: statusFilter === filter.value ? "#fff" : "#222",
                    cursor: "pointer",
                  }}
                >
                  {filter.label} (
                  {filter.value === "ALL"
                    ? orders.length
                    : orders.filter((order) => order.status === filter.value)
                        .length}
                  ){" "}
                </button>
              ))}
            </div>

            <button
              onClick={fetchOrders}
              disabled={ordersLoading}
              style={{
                padding: "10px 16px",
                cursor: "pointer",
              }}
            >
              {ordersLoading ? "Завантаження..." : "Оновити замовлення"}
            </button>
          </div>

          {/* Статистика замовлень */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "14px",
              margin: "20px 0 25px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Усього замовлень */}
            <div
              style={{
                padding: "18px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                background: "#fff",
              }}
            >
              <p style={{ margin: "0 0 8px", color: "#666" }}>
                Усього замовлень
              </p>
              <strong style={{ fontSize: "26px" }}>{totalOrders}</strong>
            </div>

            {/* Сума продажів */}
            <div
              style={{
                padding: "18px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                background: "#fff",
              }}
            >
              <p style={{ margin: "0 0 8px", color: "#666" }}>Сума продажів</p>
              <strong style={{ fontSize: "26px" }}>
                {totalSales.toLocaleString("uk-UA")} грн
              </strong>
            </div>

            {/* Нові замовлення */}
            <div
              style={{
                padding: "18px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                background: "#fff",
              }}
            >
              <p style={{ margin: "0 0 8px", color: "#666" }}>
                Нові замовлення
              </p>
              <strong style={{ fontSize: "26px" }}>{newOrdersCount}</strong>
            </div>

            {/* Скасовані замовлення */}
            <div
              style={{
                padding: "18px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                background: "#fff",
              }}
            >
              <p style={{ margin: "0 0 8px", color: "#666" }}>
                Скасовані замовлення
              </p>
              <strong style={{ fontSize: "26px" }}>
                {cancelledOrdersCount}
              </strong>
            </div>
          </div>

          <div style={{ margin: "20px 0" }}>
            <input
              type="text"
              placeholder="Пошук за ім'ям, телефоном або номером замовлення..."
              value={orderSearch}
              onChange={(event) => setOrderSearch(event.target.value)}
              style={{
                width: "100%",
                maxWidth: "500px",
                padding: "12px",
                fontSize: "15px",
                border: "1px solid #ddd",
                borderRadius: "6px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ marginRight: "10px" }}>Сортувати за датою:</label>

            <select
              value={dateSort}
              onChange={(event) => setDateSort(event.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                background: "#fff",
              }}
            >
              <option value="newest">Спочатку нові</option>
              <option value="oldest">Спочатку старі</option>
            </select>
          </div>

          {ordersError && <p style={{ color: "red" }}>{ordersError}</p>}

          {ordersLoading && <p>Завантаження замовлень...</p>}

          {!ordersLoading && filteredOrders.length === 0 && !ordersError && (
            <p>Замовлень у цій категорії немає.</p>
          )}

          {!ordersLoading &&
            filteredOrders.map((order) => (
              <article
                key={order.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                  marginTop: "18px",
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <h3 style={{ margin: "0 0 10px" }}>
                    Замовлення № {order.id}
                  </h3>

                  <select
                    value={order.status}
                    onChange={(event) =>
                      handleStatusChange(order.id, event.target.value)
                    }
                    disabled={
                      statusUpdating[order.id] || order.status === "CANCELLED"
                    }
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      fontWeight: "600",
                      cursor: "pointer",
                      background: "#fff",
                    }}
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <p>
                  <strong>Дата:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString("uk-UA")}
                </p>

                <p>
                  <strong>Клієнт:</strong> {order.customerName}
                </p>

                <p>
                  <strong>Телефон:</strong> {order.phone}
                </p>

                <p>
                  <strong>Місто:</strong> {order.city}
                </p>

                <p>
                  <strong>Доставка:</strong>{" "}
                  {order.deliveryType === "novaPoshta"
                    ? "Нова пошта"
                    : "Адресна доставка"}
                </p>

                {order.deliveryType === "novaPoshta" ? (
                  <>
                    {order.warehouseName && (
                      <p>
                        <strong>Відділення:</strong> {order.warehouseName}
                      </p>
                    )}
                  </>
                ) : (
                  <p>
                    <strong>Адреса:</strong>{" "}
                    {order.deliveryAddress || "Не вказана"}
                  </p>
                )}

                {order.comment && (
                  <p>
                    <strong>Коментар:</strong> {order.comment}
                  </p>
                )}

                <h4>Товари в замовленні:</h4>

                {order.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div>
                      <strong>{item.productName}</strong>
                    </div>

                    <div>Штрихкод: {item.barcode}</div>

                    <div>
                      {item.quantity} шт. × {item.price} грн = {item.lineTotal}{" "}
                      грн
                    </div>
                  </div>
                ))}

                <p style={{ fontSize: "17px" }}>
                  <strong>Кількість товарів:</strong> {order.cartCount}
                </p>

                <p style={{ fontSize: "19px" }}>
                  <strong>Разом: {order.total} грн</strong>
                </p>

                {order.status !== "CANCELLED" &&
                  !["SHIPPED", "COMPLETED"].includes(order.status) && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      disabled={cancelling[order.id]}
                      style={{
                        background: "#b42318",
                        color: "#fff",
                        border: "none",
                        padding: "11px 18px",
                        borderRadius: "6px",
                        cursor: cancelling[order.id]
                          ? "not-allowed"
                          : "pointer",
                        opacity: cancelling[order.id] ? 0.6 : 1,
                        marginTop: "15px",
                      }}
                    >
                      {cancelling[order.id]
                        ? "Скасування..."
                        : "Скасувати замовлення"}
                    </button>
                  )}
              </article>
            ))}
        </section>
      )}
    </main>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res);

  if (session.isAdmin !== true) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
