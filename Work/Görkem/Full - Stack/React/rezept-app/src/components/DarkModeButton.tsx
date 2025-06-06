import { useEffect } from "react";
import "./DarkMode.css";

type Props = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

export default function DarkModeButton({ darkMode, toggleDarkMode }: Props) {
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkmode");
    } else {
      document.body.classList.remove("darkmode");
    }
  }, [darkMode]);

    return (
    <button
      className="darkmode-btn"
      title={darkMode ? "Hellen Modus aktivieren" : "Darkmode aktivieren"}
      onClick={toggleDarkMode}
      aria-label="Darkmode umschalten"
    >
      <span className="material-icons">
        {darkMode ? "dark_mode" : "light_mode"}
      </span>
    </button>
  );
}