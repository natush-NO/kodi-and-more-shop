export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { action, query, cityRef } = req.body;

    const apiKey = process.env.NOVA_POSHTA_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Nova Poshta API key is not configured",
      });
    }

    const apiUrl = "https://api.novaposhta.ua/v2.0/json/";

    // =========================================================
    // ПОШУК НАСЕЛЕНИХ ПУНКТІВ
    // =========================================================

    if (action === "settlements") {
      const searchQuery = typeof query === "string" ? query.trim() : "";

      if (!searchQuery) {
        return res.status(200).json({
          success: true,
          data: [],
        });
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey,
          modelName: "Address",
          calledMethod: "searchSettlements",
          methodProperties: {
            CityName: searchQuery,
            Limit: 20,
            Page: 1,
          },
        }),
      });

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Nova Poshta returned invalid JSON:", responseText);

        return res.status(502).json({
          success: false,
          message: "Nova Poshta returned an invalid response",
        });
      }

      if (!response.ok || !data.success) {
        console.error("Nova Poshta settlements error:", data);

        return res.status(400).json({
          success: false,
          message:
            Array.isArray(data.errors) && data.errors.length > 0
              ? data.errors.join(", ")
              : "Failed to load settlements",
        });
      }

      const addresses = data.data?.[0]?.Addresses || [];

      const settlements = addresses.map((item) => ({
        ref: item.DeliveryCity || item.Ref || "",
        name: item.Present || item.MainDescription || "",
        mainDescription: item.MainDescription || "",
        areaDescription: item.AreaDescription || "",
        region: item.Region || "",
      }));

      return res.status(200).json({
        success: true,
        data: settlements,
      });
    }

    // =========================================================
    // ПОШУК ВІДДІЛЕНЬ / ПОШТОМАТІВ
    // =========================================================

    if (action === "warehouses") {
      if (!cityRef) {
        return res.status(200).json({
          success: true,
          data: [],
        });
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey,
          modelName: "AddressGeneral",
          calledMethod: "getWarehouses",
          methodProperties: {
            CityRef: cityRef,
            Limit: 100,
            Page: 1,
          },
        }),
      });

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Nova Poshta returned invalid JSON:", responseText);

        return res.status(502).json({
          success: false,
          message: "Nova Poshta returned an invalid response",
        });
      }

      if (!response.ok || !data.success) {
        console.error("Nova Poshta warehouses error:", data);

        return res.status(400).json({
          success: false,
          message:
            Array.isArray(data.errors) && data.errors.length > 0
              ? data.errors.join(", ")
              : "Failed to load warehouses",
        });
      }

      const warehouses = (data.data || []).map((item) => ({
        ref: item.Ref,
        description: item.Description,
        shortAddress: item.ShortAddress,
        typeOfWarehouse: item.TypeOfWarehouse,
        number: item.Number,
        categoryOfWarehouse: item.CategoryOfWarehouse,
      }));

      return res.status(200).json({
        success: true,
        data: warehouses,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Unknown action",
    });
  } catch (error) {
    console.error("Nova Poshta API error:", error);

    return res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
}
