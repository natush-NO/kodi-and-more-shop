import bcrypt from "bcryptjs";
import { getSession } from "@/lib/session";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      message: "Метод не дозволений",
    });
  }

  try {
    const { username, password } = req.body ?? {};

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !username ||
      !password
    ) {
      return res.status(400).json({
        message: "Введи логін і пароль",
      });
    }

    if (
      !process.env.ADMIN_USERNAME ||
      !process.env.ADMIN_PASSWORD_HASH_BASE64 ||
      !process.env.SESSION_PASSWORD
    ) {
      console.error("Admin credentials are not configured");

      return res.status(500).json({
        message: "Помилка налаштування авторизації",
      });
    }

    const validUsername = username === process.env.ADMIN_USERNAME;

    const hash = Buffer.from(
      process.env.ADMIN_PASSWORD_HASH_BASE64,
      "base64",
    ).toString("utf8");

    console.log("DECODED HASH START:", hash.slice(0, 7));
    console.log("DECODED HASH LENGTH:", hash.length);

    const validPassword = await bcrypt.compare(password, hash);

    if (!validUsername || !validPassword) {
      return res.status(401).json({
        message: "Неправильний логін або пароль",
      });
    }

    const session = await getSession(req, res);

    session.isAdmin = true;

    await session.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      message: "Не вдалося виконати вхід",
    });
  }
}
