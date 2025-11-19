import { createContext, useContext, useState, type ReactNode } from 'react';
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
	isLoading: boolean;
	user: UserType | null;
	login: (username: string, password: string) => Promise<string | null>;
	logout: () => void;
}


/* ===== Context Setup ===== */
const UserContext = createContext<UserContextType | undefined>(undefined);


/* ===== Context Provider ===== */
export const UserProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [isLoading, setLoading] = useState(false);
	const [user, setUser] = useState<UserType | null>(getUser);


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
			setLoading(true);
		  
			/* Simulate server delay */
			await new Promise(resolve => setTimeout(resolve, 2000)); // 2s

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

			/* Save JWT token and user */
			localStorage.setItem('token', data.token);
			localStorage.setItem('user', JSON.stringify(data.userData));
			setUser(data.userData);
			console.log(data.userData);

			/* Navigate to the goTo route and toast */
			const goTo = location.state?.from || '/dashboard';
			navigate(goTo);
			toast.success('Logged in successfully');
			return null;
		}
		catch (error: any) {
			console.error('Login error:', error);
			toast.error(error.message);
			return error.message;
		}
		finally {
			setLoading(false);
		}
	}


	/* === Logout === */
	function logout() {
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
		<UserContext.Provider value={{ user, isLoading, login, logout }}>
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
