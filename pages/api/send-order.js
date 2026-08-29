export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const { customer, products, cartCount, cartTotal, locale } = req.body;

    if (!customer || !products || products.length === 0) {
      return res.status(400).json({
        message: locale === "en" ? "No order data" : "Немає даних замовлення",
      });
    }

    const isEnglish = locale === "en";

    const text = isEnglish
      ? {
          newOrder: "🛍 NEW ORDER",
          customer: "👤 CUSTOMER",
          name: "Name",
          phone: "Phone",
          city: "City",
          novaPoshta: "Nova Poshta",
          products: "📦 PRODUCTS",
          article: "Article:",
          quantity: "Quantity of items",
          total: "💰 TOTAL",
          comment: "💬 Comment:",
          product: "Product",
          hryvnia: "UAH",
        }
      : {
          newOrder: "🛍 НОВЕ ЗАМОВЛЕННЯ",
          customer: "👤 КЛІЄНТ",
          name: "Ім'я",
          phone: "Телефон",
          city: "Місто",
          novaPoshta: "Нова пошта",
          products: "📦 ТОВАРИ",
          article: "Арт.:",
          quantity: "Кількість товарів",
          total: "💰 РАЗОМ",
          comment: "💬 Коментар:",
          product: "Товар",
          hryvnia: "грн",
        };

    const productsText = products
      .map((item) => {
        const price = item.salePrice ?? item.price;
        const total = price * item.quantity;

        return [
          `• ${item.name || text.product}`,
          `  ${text.article} ${item.article || item.sku || "—"}`,
          `  ${price} ${text.hryvnia} × ${item.quantity} = ${total} ${text.hryvnia}`,
        ].join("\n");
      })
      .join("\n\n");

    const message = [
      text.newOrder,
      "",
      text.customer,
      `${text.name}: ${customer.name}`,
      `${text.phone}: ${customer.phone}`,
      `${text.city}: ${customer.city}`,
      `${text.novaPoshta}: ${customer.novaPoshta}`,
      "",
      text.products,
      productsText,
      "",
      `${text.quantity}: ${cartCount}`,
      `${text.total}: ${cartTotal} ${text.hryvnia}`,
      "",
      customer.comment ? `${text.comment}\n${customer.comment}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error("Telegram error:", data);

      return res.status(500).json({
        message: isEnglish
          ? "Failed to send the order"
          : "Не вдалося надіслати замовлення",
      });
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Order error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}
