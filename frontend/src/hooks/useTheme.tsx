import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';



/* ===================== PROPS ===================== */
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}



/* ===================== CONTEXT SETUP ===================== */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);



/* ===================== HELPER FUNCTION ===================== */
const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme !== null) return savedTheme === 'dark';

  // fallback → get system theme
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return systemTheme;
};



/* ===================== CONTEXT PROVIDER ===================== */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(getInitialTheme);
  const toggleTheme = () => setIsDark(prev => !prev);


  /* ___ Set Theme When isDark Changes ___ */
  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [isDark]);


  /* ====== Return ====== */
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};



/* ===================== CUSTOM HOOK ===================== */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
