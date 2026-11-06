import { getIronSession } from "iron-session";

export const sessionOptions = {
  cookieName: "kodi_admin_session",
  password: process.env.SESSION_PASSWORD,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  },
};

export async function getSession(req, res) {
  return getIronSession(req, res, sessionOptions);
}

export async function requireAdmin(req, res) {
  const session = await getSession(req, res);

  if (session.isAdmin !== true) {
    res.status(401).json({
      message: "Потрібна авторизація адміністратора",
    });

    return null;
  }

  return session;
}
