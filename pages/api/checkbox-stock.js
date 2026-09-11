export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { barcodes } = req.body;

    if (!Array.isArray(barcodes)) {
      return res.status(400).json({
        success: false,
        message: "barcodes must be an array",
      });
    }

    const requestedBarcodes = [
      ...new Set(
        barcodes.filter(Boolean).map((barcode) => String(barcode).trim()),
      ),
    ];

    if (requestedBarcodes.length === 0) {
      return res.status(200).json({
        success: true,
        stock: {},
      });
    }

    const licenseKey = process.env.CHECKBOX_LICENSE_KEY;
    const cashierPin = process.env.CHECKBOX_CASHIER_PIN;

    if (!licenseKey || !cashierPin) {
      return res.status(500).json({
        success: false,
        message: "Checkbox environment variables are missing",
      });
    }

    /*
     * 1. Авторизація в Checkbox
     */
    const signinResponse = await fetch(
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

    const signinData = await signinResponse.json();

    if (!signinResponse.ok) {
      console.error("Checkbox signin error:", signinData);

      return res.status(signinResponse.status).json({
        success: false,
        message: signinData?.message || "Failed to authorize in Checkbox",
      });
    }

    const token = signinData?.access_token || signinData?.token;

    if (!token) {
      console.error("Checkbox signin response without token:", signinData);

      return res.status(500).json({
        success: false,
        message: "Checkbox token was not received",
      });
    }

    /*
     * 2. Запитуємо товари ПАРАЛЕЛЬНО.
     *
     * Важливо:
     * Checkbox search є нечітким.
     * Тому після відповіді ми завжди
     * перевіряємо точний barcode.
     */
    const loadStockForBarcode = async (barcode) => {
      try {
        const url =
          "https://api.checkbox.in.ua/api/v1/goods" +
          `?query=${encodeURIComponent(barcode)}` +
          "&limit=100" +
          "&offset=0";

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error(`Checkbox goods error for ${barcode}:`, data);

          return {
            barcode,
            stock: null,
          };
        }

        const goods = data?.results || data?.data || [];

        /*
         * ОБОВ'ЯЗКОВО шукаємо саме той barcode,
         * який запросили.
         *
         * Не беремо просто перший результат,
         * тому що Checkbox search може бути fuzzy.
         */
        const exactGood = goods.find(
          (good) => String(good?.barcode || "").trim() === barcode,
        );

        if (!exactGood) {
          console.warn(`Exact Checkbox barcode not found: ${barcode}`);

          return {
            barcode,
            stock: null,
          };
        }

        /*
         * Checkbox може повертати count
         * у тисячних частинах одиниці:
         *
         * 1000 = 1
         * 2000 = 2
         * 500  = 0.5
         */
        const rawCount = exactGood?.count ?? exactGood?.quantity ?? 0;

        const stock = Number(rawCount) / 1000;

        return {
          barcode,
          stock: Number.isFinite(stock) ? stock : 0,
        };
      } catch (error) {
        console.error(`Checkbox request failed for ${barcode}:`, error);

        return {
          barcode,
          stock: null,
        };
      }
    };

    /*
     * 3. Виконуємо всі запити паралельно.
     */
    const results = await Promise.all(
      requestedBarcodes.map(loadStockForBarcode),
    );

    /*
     * 4. Формуємо:
     *
     * {
     *   "20117504": 1,
     *   "20117511": 3,
     *   "20117528": 0
     * }
     */
    const stock = {};

    results.forEach(({ barcode, stock: quantity }) => {
      stock[barcode] = quantity;
    });

    return res.status(200).json({
      success: true,
      stock,
    });
  } catch (error) {
    console.error("Checkbox stock API error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load Checkbox stock",
    });
  }
}
