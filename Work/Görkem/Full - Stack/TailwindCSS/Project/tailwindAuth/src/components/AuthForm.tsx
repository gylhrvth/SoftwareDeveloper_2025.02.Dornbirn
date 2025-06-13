import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function AuthForm() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) {
    return (
      <div className="p-6 bg-[var(--color-success-bg)] rounded text-[var(--color-success-text)] text-center">
        Eingeloggt als: <b>{user?.email}</b>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@")) {
      setError("Bitte eine gültige E-Mail eingeben.");
      return;
    }
    if (password.length < 6) {
      setError("Das Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }

    await loginWithRedirect({
      ...(mode === "register"
        ? { authorizationParams: { screen_hint: "signup" } }
        : {}),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="auth-form max-w-md mx-auto bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] p-8 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {mode === "login" ? "Login" : "Registrieren"}
      </h2>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium">
          E-Mail
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md bg-[var(--color-input-bg)] text-[var(--color-text)]"
          placeholder="dein@email.de"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block mb-1 font-medium">
          Passwort
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md bg-[var(--color-input-bg)] text-[var(--color-text)]"
          placeholder="Mind. 6 Zeichen"
        />
      </div>

      {error && <p className="text-[var(--color-error)] text-sm mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full bg-[var(--color-primary)] text-white py-2 rounded-md hover:bg-[var(--color-primary-hover)] transition"
      >
        {mode === "login" ? "Login" : "Registrieren"}
      </button>

      <button
        type="button"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
        className="mt-4 w-full text-[var(--color-link)] underline"
      >
        {mode === "login"
          ? "Noch kein Konto? Registrieren"
          : "Schon registriert? Login"}
      </button>
    </form>
  );
}
