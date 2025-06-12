import React, { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(()=> {
        const stored = localStorage.getItem("theme");
        if (stored === "dark" || stored === "light") return stored;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        //document.documentElement.classList.toggle("dark", theme === "dark");
        document.documentElement.dataset.theme = (theme === 'dark' ? 'dark':'')
        localStorage.setItem("theme", theme);
        console.log(`Theme gesetzt: ${theme}`);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


