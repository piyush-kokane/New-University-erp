import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';


/* ===== UserData Interface ===== */
interface UserType {
	Role: string;
	Status: string;
	FullName: string;
	FirstName: string;
	LastName: string;
	Contact: string;
	Gmail: string;
	Prn: string;
	Branch: string;
	Term: string;
	Profile: string;
	Banner: string;
	Biotag: string;
	LongBio: string;
	ShortBio: string;
}


/* ===== Context Interface ===== */
interface UserContextType {
	user: UserType | null;
	loggingIn: boolean;
	loggingOut: boolean;
	setLoggingOut: (value: boolean) => void;
	login: (username: string, password: string) => Promise<string | null>;
	logout: () => void;
}


/* ===== Context Setup ===== */
const UserContext = createContext<UserContextType | undefined>(undefined);


/* ===== Context Provider ===== */
export const UserProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [user, setUser] = useState<UserType | null>(getUser);
	const [loggingIn, setLoggingIn] = useState(false);
	const [loggingOut, setLoggingOut] = useState(false);


	/* === Get user on mount === */
	function getUser() {
		const userData = localStorage.getItem('user');
		return userData
			? JSON.parse(userData) // parse string from localStorage
			: null; // else return null
	}


	/* === Login with JWT token === */
	async function login(username: string, password: string) {
		try {
			setLoggingIn(true);
		  
			/* Simulate server delay */
			//await new Promise(resolve => setTimeout(resolve, 2000)); // 2s

			/* Validate user credentials */
			const response = await fetch('http://localhost:5000/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Invalid credentials');
			}

			/* Clear localStorage except "theme" */
			const theme = localStorage.getItem('theme');
			localStorage.clear();
			if (theme) localStorage.setItem('theme', theme);

			/* Remove user */
			setUser(null);

			/* Save JWT token + login time + user */
			localStorage.setItem('token', data.token);
			localStorage.setItem('loginTime', Date.now().toString());
			localStorage.setItem('user', JSON.stringify(data.userData));
			setUser(data.userData);
			console.log(data.userData);

			/* Toast */
			toast.success('Logged in successfully');
			console.log('🟢 Logged in');

			/* Navigate to the goTo route */
			const goTo = location.state?.from || '/dashboard';
			navigate(goTo,{ replace: true});
			return null;
		}
		catch (error: any) {
			console.error('Login error:', error);
			toast.error(error.message);
			return error.message;
		}
		finally {
			setLoggingIn(false);
		}
	}


	/* === Logout === */
	function logout() {
		setLoggingOut(true);

		/* Clear localStorage except "theme" */
		const theme = localStorage.getItem('theme');
		localStorage.clear();
		if (theme) localStorage.setItem('theme', theme);

		/* Remove user */
		setUser(null);

		/* Navigate to login page */
		navigate('/login', { state: { from: location.pathname }, replace: true });
	}


	/* === return === */
	return (
		<UserContext.Provider value={{ user, loggingIn, loggingOut, setLoggingOut, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};


/* ===== Custom Hook ===== */
export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) throw new Error('useUser must be used within a UserProvider');
	return context;
};
