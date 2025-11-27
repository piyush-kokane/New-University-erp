import { createContext, useContext, useState, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';


/* ===== UserData Interface ===== */
interface UserDataType {
	role: string;
	status: string;
	fullName: string;
	firstName: string;
	lastName: string;
	contact: string;
	gmail: string;
	prn: string;
	branch: string;
	term: string;
	profile: string;
	banner: string;
	biotag: string;
	longBio: string;
	shortBio: string;
}


/* ===== API Response Interface ===== */
interface ApiResponse {
	token: string;
	userData: UserDataType;
	message?: string;
}


/* ===== Login Error Interface ===== */
interface LoginError {
	status: number;
	message: string;
}

/* ===== Context Interface ===== */
interface UserContextType {
	user: UserDataType | null;
	loggingIn: boolean;
	loggingOut: boolean;
	setLoggingOut: (value: boolean) => void;
	login: (username: string, password: string) => Promise<LoginError | null>;
	logout: (status?: number) => void;
}


/* ===== Context Setup ===== */
const UserContext = createContext<UserContextType | undefined>(undefined);


/* ===== Context Provider ===== */
export const UserProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [user, setUser] = useState<UserDataType | null>(getUser);
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
		setLoggingIn(true);

		try {
			// Simulate server delay
			//await new Promise(resolve => setTimeout(resolve, 2000)); // 2s

			// Validate user credentials
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});

			const data: ApiResponse = await response.json();

			// If error
			if (!response.ok) {
				throw {
					status: response.status,
					message: data?.message || 'Invalid credentials',
				};
			}

			// Clear localStorage except 'theme'
			const theme = localStorage.getItem('theme');
			localStorage.clear();
			if (theme) localStorage.setItem('theme', theme);

			// Remove user
			setUser(null);

			// Save JWT token + login time + user
			localStorage.setItem('token', data.token);
			localStorage.setItem('loginTime', Date.now().toString());
			localStorage.setItem('user', JSON.stringify(data.userData));
			setUser(data.userData);

			/* Toast */
			toast.success('Logged in successfully');
			console.log('🟢 Logged in');

			/* Navigate to the goTo route */
			const goTo = location.state?.from || '/dashboard';
			navigate(goTo,{ replace: true});
			return null;
		}
		catch (error: any) {
			console.error('Login Error', error);
			return error;
		}
		finally {
			setLoggingIn(false);
		}
	}


	/* === Logout === */
	async function logout(status?:number) {
		setLoggingOut(true);

		try {
			const token = localStorage.getItem('token');

			const res = await fetch('/api/auth/logout', {
				method: 'POST',
				headers: { Authorization: `Bearer ${token}` },
			});

			// If error
			if (!res.ok) throw new Error;

			// Log based on status
			if (status === 401) {
				toast.error('Session expired. Please log in again');
				console.warn('🔴 Token expired or invalid. Logging out');
			}
			else if (status === 440) {
				toast.error('Logging out due to inactivaty');
				console.warn('🔴 Logging out due to inactivaty');
			}
			else {
				toast.success('Logged out successfully');
				console.log('🔴 Logged out');
			}

			// Clear localStorage except 'theme'
			const theme = localStorage.getItem('theme');
			localStorage.clear();
			if (theme) localStorage.setItem('theme', theme);

			// Remove user
			setUser(null);

			// Navigate to login page
			navigate('/login', { state: { from: location.pathname }, replace: true });
		}
		catch (error: any) {
			toast.error('Error logging out. Please try again');
			console.error('🔺 Error logging out');
		}
		finally {
			// setLoggingOut(false);
			// set loging out flag to false only after login page is loaded
			// done in Login.tsx
		}
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
