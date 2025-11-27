import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';


/* ===== Context Interface ===== */
interface ThemeContextType {
	isDark: boolean;
	toggleTheme: () => void;
}


/* ===== Context Setup ===== */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


/* ===== Context Provider ===== */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [isDark, setIsDark] = useState<boolean>(getInitialTheme);
	const toggleTheme = () => setIsDark(!isDark);


	/* === Get theme on mount === */
	function getInitialTheme(): boolean {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme !== null) return savedTheme === 'dark';

		// fallback → get system theme
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		return systemTheme;
	}


	/* === Set theme when isDark changes === */
	useEffect(() => {
		const theme = isDark ? 'dark' : 'light';
		localStorage.setItem('theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
	}, [isDark]);


	/* === return === */
	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};


/* ===== Custom Hook ===== */
export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) throw new Error('useTheme must be used within a ThemeProvider');
	return context;
}
