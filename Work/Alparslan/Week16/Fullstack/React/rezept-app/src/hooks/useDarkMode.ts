import { useState, useEffect } from "react";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkmode");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkmode", String(darkMode));
  }, [darkMode]);

  return [darkMode, setDarkMode] as const;
}
