import { getSession } from "@/lib/session";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      message: "Метод не дозволений",
    });
  }

  try {
    const session = await getSession(req, res);

    session.destroy();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Admin logout error:", error);

    return res.status(500).json({
      message: "Не вдалося вийти з акаунта",
    });
  }
}
