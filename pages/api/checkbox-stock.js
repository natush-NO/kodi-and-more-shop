export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { barcodes } = req.body;

    if (!Array.isArray(barcodes) || barcodes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Barcodes are required",
      });
    }

    const licenseKey = process.env.CHECKBOX_LICENSE_KEY;

    const cashierPin = process.env.CHECKBOX_CASHIER_PIN;

    if (!licenseKey || !cashierPin) {
      return res.status(500).json({
        success: false,
        message: "Checkbox credentials are not configured",
      });
    }

    // ==========================================
    // 1. Авторизація касира
    // ==========================================

    const authResponse = await fetch(
      "https://api.checkbox.in.ua/api/v1/cashier/signinPinCode",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-License-Key": licenseKey,
        },
        body: JSON.stringify({
          pin_code: cashierPin,
        }),
      },
    );

    const authData = await authResponse.json();

    if (!authResponse.ok) {
      console.error("Checkbox auth error:", authData);

      return res.status(authResponse.status).json({
        success: false,
        message:
          authData?.message ||
          authData?.detail ||
          authData?.error ||
          "Checkbox authorization failed",
      });
    }

    const accessToken = authData.access_token;

    if (!accessToken) {
      return res.status(400).json({
        success: false,
        message: "Checkbox access token was not received",
      });
    }

    // ==========================================
    // 2. Barcode, які нам потрібні
    // ==========================================

    const requestedBarcodes = new Set(
      barcodes.map((barcode) => String(barcode).trim()).filter(Boolean),
    );

    const stock = {};

    // ==========================================
    // 3. Отримуємо товари Checkbox сторінками
    // ==========================================

    const limit = 100;
    let offset = 0;

    while (true) {
      const goodsUrl =
        `https://api.checkbox.in.ua/api/v1/goods` +
        `?limit=${limit}&offset=${offset}`;

      const goodsResponse = await fetch(goodsUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const goodsData = await goodsResponse.json();

      if (!goodsResponse.ok) {
        console.error("Checkbox goods error:", goodsData);

        return res.status(goodsResponse.status).json({
          success: false,
          message:
            goodsData?.message ||
            goodsData?.detail ||
            "Failed to load Checkbox goods",
        });
      }

      const goods = goodsData?.results || goodsData?.data || [];

      // ========================================
      // 4. Шукаємо потрібні barcode
      // ========================================

      goods.forEach((item) => {
        const barcode = String(
          item.barcode ?? item.bar_code ?? item.barCode ?? item.ean ?? "",
        ).trim();

        if (!barcode || !requestedBarcodes.has(barcode)) {
          return;
        }

        const count =
          typeof item.count === "number" ? item.count : Number(item.count);

        stock[barcode] = Number.isFinite(count) ? count / 1000 : null;
      });

      // ========================================
      // 5. Якщо знайшли всі потрібні товари —
      //    більше сторінок не треба
      // ========================================

      const foundAll = Array.from(requestedBarcodes).every((barcode) =>
        Object.prototype.hasOwnProperty.call(stock, barcode),
      );

      if (foundAll) {
        break;
      }

      // ========================================
      // 6. Якщо сторінка неповна —
      //    це була остання сторінка
      // ========================================

      if (goods.length < limit) {
        break;
      }

      offset += limit;
    }

    // ==========================================
    // 7. Для barcode, яких Checkbox не знайшов,
    //    явно ставимо null
    // ==========================================

    requestedBarcodes.forEach((barcode) => {
      if (!Object.prototype.hasOwnProperty.call(stock, barcode)) {
        stock[barcode] = null;
      }
    });

    console.log("Checkbox stock result:", stock);

    return res.status(200).json({
      success: true,
      stock,
    });
  } catch (error) {
    console.error("Checkbox API error:", error);

    return res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
}
