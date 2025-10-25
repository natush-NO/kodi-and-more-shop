// pages/api/checkbox/sync.js

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.checkbox.ua/api/v1/goods/export/json",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.CHECKBOX_TOKEN}`,
          "X-Client-Name": "MyNextIntegration",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Не вдалося отримати дані з Checkbox");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Помилка Checkbox:", error);
    res.status(500).json({ message: "Помилка отримання даних" });
  }
}
