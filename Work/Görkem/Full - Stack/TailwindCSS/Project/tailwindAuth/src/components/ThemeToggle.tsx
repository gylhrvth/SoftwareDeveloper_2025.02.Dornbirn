import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="absolute top-4 right-4 text-2xl bg-white/70 dark:bg-gray-800/70 rounded-full p-2 shadow transition"
      aria-label="Theme wechseln"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
