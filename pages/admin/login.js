import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Помилка входу");
      }

      router.replace("/admin");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "380px",
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          background: "#fff",
        }}
      >
        <h1 style={{ marginBottom: "25px" }}>Вхід в адмінпанель</h1>

        <label htmlFor="username">Логін</label>

        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          autoComplete="username"
          style={{
            width: "100%",
            padding: "12px",
            margin: "8px 0 18px",
            boxSizing: "border-box",
          }}
        />

        <label htmlFor="password">Пароль</label>

        <div style={{ position: "relative", margin: "8px 0 18px" }}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
            style={{
              width: "100%",
              padding: "12px 45px 12px 12px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
            }}
            aria-label={showPassword ? "Приховати пароль" : "Показати пароль"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#222",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Вхід..." : "Увійти"}
        </button>
      </form>
    </main>
  );
}
