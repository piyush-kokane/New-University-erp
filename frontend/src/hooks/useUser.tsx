import { createContext, useContext, useState, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';



/* ===================== TYPES ===================== */
type UserData = {
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
};

type ApiResponse = {
  token: string;
  userData: UserData;
  message?: string;
};

type LoginError = {
  status: number;
  message: string;
};



/* ===================== PROPS ===================== */
interface UserContextType {
  user: UserData | null;
  loggingIn: boolean;
  loggingOut: boolean;
  setLoggingOut: (value: boolean) => void;
  login: (username: string, password: string) => Promise<LoginError | null>;
  logout: (status?: number) => void;
}



/* ===================== CONTEXT SETUP ===================== */
const UserContext = createContext<UserContextType | undefined>(undefined);



/* ===================== HELPER FUNCTION ===================== */
const getUser = (): (UserData | null) => {
  const userData = localStorage.getItem('user');
  return userData
    ? JSON.parse(userData) // parse string from localStorage
    : null; // else return null
};



/* ===================== CONTEXT PROVIDER ===================== */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<UserData | null>(getUser);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);


  /* ___ Login With JWT Token ___ */
  const login = async (username: string, password: string) => {
    setLoggingIn(true);

    try {
      // Simulate server delay
      //await new Promise(resolve => setTimeout(resolve, 2000)); // 2s

      // Validate user credentials
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data: ApiResponse = await res.json().catch(() => ({}));

      // If error
      if (!res.ok) {
        throw {
          status: res.status,
          message: data?.message || 'Server unreachable',
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
  };


  /* ___ Logout ___ */
  const logout = async (status?: number) => {
    const localLogout = () => {
      // Clear localStorage except 'theme'
      const theme = localStorage.getItem('theme');
      localStorage.clear();
      if (theme) localStorage.setItem('theme', theme);

      // Remove user
      setUser(null);

      // Navigate to login page
      navigate('/login', { state: { from: location.pathname }, replace: true });
    };

    setLoggingOut(true);

    try {
      const token = localStorage.getItem('token');

      // Call logout api
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

      // Logout locally
      localLogout();
    }
    catch (error: any) {
      toast.error('Error logging out. Logging out locally');
      console.warn('🔺 Error logging out. Logging out locally');
      localLogout();
    }
    finally {
      // setLoggingOut(false);
      // set loging out flag to false only after login page is loaded
      // done in Login.tsx
    }
  };


  /* ====== Return ====== */
  return (
    <UserContext.Provider value={{ user, loggingIn, loggingOut, setLoggingOut, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};



/* ===================== CUSTOM HOOK ===================== */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
