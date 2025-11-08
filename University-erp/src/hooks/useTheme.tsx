import { createContext, useContext, useEffect, useState, type ReactNode } from "react";


interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getInitialTheme = (): boolean => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme !== null) return savedTheme === "dark";

    // fallback → get system theme
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return systemTheme;
  };

  const [isDark, setIsDark] = useState<boolean>(getInitialTheme);

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}