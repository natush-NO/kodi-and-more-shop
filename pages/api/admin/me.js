import { getSession } from "@/lib/session";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      message: "Метод не дозволений",
    });
  }

  try {
    const session = await getSession(req, res);

    return res.status(200).json({
      isAdmin: session.isAdmin === true,
    });
  } catch (error) {
    console.error("Admin session error:", error);

    return res.status(500).json({
      message: "Не вдалося перевірити авторизацію",
    });
  }
}
