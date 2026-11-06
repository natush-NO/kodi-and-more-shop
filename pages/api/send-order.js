import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);

    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const locale = req.body?.locale === "en" ? "en" : "uk";
  const isEnglish = locale === "en";

  try {
    const { customer, products } = req.body ?? {};

    // Перевірка основних даних покупця
    if (
      !customer ||
      typeof customer.name !== "string" ||
      !customer.name.trim() ||
      typeof customer.phone !== "string" ||
      !customer.phone.trim() ||
      typeof customer.city !== "string" ||
      !customer.city.trim()
    ) {
      return res.status(400).json({
        message: isEnglish
          ? "Please provide valid customer information"
          : "Перевір дані покупця",
      });
    }

    // Перевірка типу доставки
    const deliveryType = customer.deliveryType;

    if (!["novaPoshta", "address"].includes(deliveryType)) {
      return res.status(400).json({
        message: isEnglish
          ? "Please select a valid delivery method"
          : "Оберіть правильний спосіб доставки",
      });
    }

    const cityRef =
      typeof customer.cityRef === "string" ? customer.cityRef.trim() : "";

    const warehouseRef =
      typeof customer.warehouseRef === "string"
        ? customer.warehouseRef.trim()
        : "";

    const warehouseName =
      typeof customer.warehouseName === "string"
        ? customer.warehouseName.trim()
        : "";

    const novaPoshta =
      typeof customer.novaPoshta === "string" ? customer.novaPoshta.trim() : "";

    const deliveryAddress =
      typeof customer.deliveryAddress === "string"
        ? customer.deliveryAddress.trim()
        : typeof customer.address === "string"
          ? customer.address.trim()
          : "";

    // Для обох способів доставки місто має бути вибране
    if (!cityRef) {
      return res.status(400).json({
        message: isEnglish
          ? "Please select a city"
          : "Будь ласка, виберіть місто зі списку",
      });
    }

    // Перевірка конкретного способу доставки
    if (deliveryType === "novaPoshta") {
      if (!novaPoshta || !warehouseRef || !warehouseName) {
        return res.status(400).json({
          message: isEnglish
            ? "Please select a Nova Poshta branch"
            : "Будь ласка, виберіть відділення Нової пошти",
        });
      }
    }

    if (deliveryType === "address" && !deliveryAddress) {
      return res.status(400).json({
        message: isEnglish
          ? "Please enter your delivery address"
          : "Вкажіть адресу доставки",
      });
    }

    // Перевірка кошика
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: isEnglish ? "Your cart is empty" : "Кошик порожній",
      });
    }

    // Перевірка товарів
    for (const item of products) {
      if (
        !item ||
        typeof item.id !== "string" ||
        !item.id.trim() ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          message: isEnglish
            ? "Invalid product data"
            : "Некоректні дані товару",
        });
      }
    }

    // Об'єднання однакових товарів
    const quantities = new Map();

    for (const item of products) {
      const quantity = (quantities.get(item.id) ?? 0) + item.quantity;

      if (!Number.isSafeInteger(quantity)) {
        return res.status(400).json({
          message: isEnglish
            ? "Invalid product quantity"
            : "Некоректна кількість товару",
        });
      }

      quantities.set(item.id, quantity);
    }

    const orderProducts = Array.from(quantities, ([id, quantity]) => ({
      id,
      quantity,
    }));

    // Транзакція PostgreSQL
    const order = await prisma.$transaction(async (tx) => {
      const productIds = orderProducts.map((item) => item.id);

      const dbProducts = await tx.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });

      const productsMap = new Map(
        dbProducts.map((product) => [product.id, product]),
      );

      // Перевірка наявності та залишків
      for (const item of orderProducts) {
        const product = productsMap.get(item.id);

        if (!product) {
          const error = new Error("PRODUCT_NOT_FOUND");
          error.productId = item.id;
          throw error;
        }

        if (product.stockQuantity < item.quantity) {
          const error = new Error("INSUFFICIENT_STOCK");
          error.productId = item.id;
          error.available = product.stockQuantity;
          error.requested = item.quantity;
          throw error;
        }
      }

      // Розрахунок цін виключно за даними бази
      const orderItems = orderProducts.map((item) => {
        const product = productsMap.get(item.id);

        const price =
          product.isSale &&
          product.salePrice !== null &&
          product.salePrice < product.price
            ? product.salePrice
            : product.price;

        const lineTotal = price * item.quantity;

        if (!Number.isSafeInteger(lineTotal)) {
          throw new Error("INVALID_ORDER_TOTAL");
        }

        return {
          productId: product.id,
          productName: product.titleKey,
          barcode: product.barcode,
          price,
          quantity: item.quantity,
          lineTotal,
        };
      });

      const total = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);

      const cartCount = orderItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      if (!Number.isSafeInteger(total)) {
        throw new Error("INVALID_ORDER_TOTAL");
      }

      // Створення замовлення
      const newOrder = await tx.order.create({
        data: {
          customerName: customer.name.trim(),
          phone: customer.phone.trim(),
          city: customer.city.trim(),

          deliveryType,

          novaPoshta: deliveryType === "novaPoshta" ? novaPoshta : null,

          deliveryAddress: deliveryType === "address" ? deliveryAddress : null,

          cityRef,

          warehouseRef: deliveryType === "novaPoshta" ? warehouseRef : null,

          warehouseName: deliveryType === "novaPoshta" ? warehouseName : null,

          comment:
            typeof customer.comment === "string"
              ? customer.comment.trim() || null
              : null,

          locale,
          total,
          cartCount,

          items: {
            create: orderItems,
          },
        },

        include: {
          items: true,
        },
      });

      // Списання залишків
      for (const item of orderProducts) {
        const result = await tx.product.updateMany({
          where: {
            id: item.id,
            stockQuantity: {
              gte: item.quantity,
            },
          },
          data: {
            stockQuantity: {
              decrement: item.quantity,
            },
          },
        });

        // Якщо залишку недостатньо,
        // транзакція скасує всі зміни
        if (result.count !== 1) {
          const error = new Error("INSUFFICIENT_STOCK");
          error.productId = item.id;
          error.requested = item.quantity;
          throw error;
        }

        // Оновлення статусу наявності
        const updatedProduct = await tx.product.findUnique({
          where: {
            id: item.id,
          },
          select: {
            stockQuantity: true,
          },
        });

        await tx.product.update({
          where: {
            id: item.id,
          },
          data: {
            inStock: updatedProduct.stockQuantity > 0,
          },
        });
      }

      return newOrder;
    });

    // Тексти Telegram
    const text = isEnglish
      ? {
          newOrder: "🛍 NEW ORDER",
          customer: "👤 CUSTOMER",
          name: "Name",
          phone: "Phone",
          city: "City",
          delivery: "Delivery",
          novaPoshta: "Nova Poshta",
          address: "Address delivery",
          branch: "Branch",
          deliveryAddress: "Delivery address",
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
          delivery: "Доставка",
          novaPoshta: "Нова пошта",
          address: "Адресна доставка",
          branch: "Відділення",
          deliveryAddress: "Адреса доставки",
          products: "📦 ТОВАРИ",
          article: "Арт.:",
          quantity: "Кількість товарів",
          total: "💰 РАЗОМ",
          comment: "💬 Коментар:",
          product: "Товар",
          hryvnia: "грн",
        };

    // Формування інформації про доставку
    const deliveryText =
      deliveryType === "novaPoshta"
        ? [
            `${text.delivery}: ${text.novaPoshta}`,
            `${text.branch}: ${order.warehouseName}`,
          ]
        : [
            `${text.delivery}: ${text.address}`,
            `${text.deliveryAddress}: ${order.deliveryAddress}`,
          ];

    // Формування повідомлення про товари
    const productsText = order.items
      .map((item) => {
        return [
          `• ${item.productName || text.product}`,
          `  ${text.article} ${item.barcode}`,
          `  ${item.price} ${text.hryvnia} × ${item.quantity} = ${item.lineTotal} ${text.hryvnia}`,
        ].join("\n");
      })
      .join("\n\n");

    const message = [
      text.newOrder,
      `№ ${order.id}`,
      "",
      text.customer,
      `${text.name}: ${order.customerName}`,
      `${text.phone}: ${order.phone}`,
      `${text.city}: ${order.city}`,
      ...deliveryText,
      "",
      text.products,
      productsText,
      "",
      `${text.quantity}: ${order.cartCount}`,
      `${text.total}: ${order.total} ${text.hryvnia}`,
      "",
      order.comment ? `${text.comment}\n${order.comment}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    // Telegram: помилка відправлення не скасовує замовлення
    let telegramSent = false;

    try {
      const token = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (!token || !chatId) {
        throw new Error("Telegram environment variables are missing");
      }

      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        },
      );

      const telegramData = await telegramResponse.json();

      if (!telegramResponse.ok || !telegramData.ok) {
        throw new Error("Telegram message failed");
      }

      telegramSent = true;
    } catch (telegramError) {
      console.error("Telegram error:", telegramError);
    }

    return res.status(200).json({
      success: true,
      orderId: order.id,
      telegramSent,
      total: order.total,
      cartCount: order.cartCount,
      items: order.items,
    });
  } catch (error) {
    console.error("Order error:", error);

    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({
        message: isEnglish
          ? "One of the products was not found"
          : "Один із товарів не знайдено",
      });
    }

    if (error.message === "INSUFFICIENT_STOCK") {
      return res.status(409).json({
        message: isEnglish
          ? "Not enough products in stock"
          : "Недостатня кількість товару на складі",
        productId: error.productId,
        available: error.available,
        requested: error.requested,
      });
    }

    if (error.message === "INVALID_ORDER_TOTAL") {
      return res.status(400).json({
        message: isEnglish
          ? "Invalid order total"
          : "Некоректна сума замовлення",
      });
    }

    return res.status(500).json({
      message: isEnglish
        ? "Server error while creating order"
        : "Помилка сервера під час оформлення замовлення",
    });
  }
}
