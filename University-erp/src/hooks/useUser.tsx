import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";



/* type def for UserData */
interface UserType {
  Role: string,
  Status: string, 
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



export async function fetchData<T>(src: string): Promise<T | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate server delay

    const endpoint = "http://localhost:5000/api" + src; // API endpoint
    const token = localStorage.getItem("token"); // JWT token

    const res = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Handle token expiration
    if (res.status === 401) {
      console.warn("Token expired or invalid. Logging out...");
      toast.error("Session expired. Please log in again.");
      const theme = localStorage.getItem("theme");
      localStorage.clear();
      if (theme) localStorage.setItem("theme", theme);
      return null;
    }

    if (!res.ok) throw new Error;
    const data: T = await res.json();
    return data;
  }
  catch (error) {
    console.error("Error fetching " + src + ":", error);
    return null;
  }
}



/* Context type */
interface UserContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: UserType | null;
  login: (token: string) => void;
  logout: () => void;
}



/* Context Setup */
const UserContext = createContext<UserContextType | undefined>(undefined);



/* Provider component */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem("loggedin") === "true");
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType | null>(getUser);


  /* Get user on mount */
  function getUser() {
    const userData = localStorage.getItem("user");
    return userData
      ? JSON.parse(userData) // Parse string from localStorage
      : null                // Else return null
  }


  /* Set isAuthenticated - check only when user changes */
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false; // Skip the first render
      return;
    }

    if (user == null) {
      setAuthenticated(false);
      localStorage.setItem("loggedin", "false");
    } else {
      setAuthenticated(true);
      localStorage.setItem("loggedin", "true");
    }
  }, [user]);


  /* Login with JWT token */
  async function login(token: string) {
    try {
      setLoading(true);

      // Clear localStorage except "theme"
      const theme = localStorage.getItem("theme");
      localStorage.clear();
      if (theme) localStorage.setItem("theme", theme);

      setUser(null); // Remove user
      
      // Save JWT token
      localStorage.setItem("token", token);

      // Fetch user data from API
      const data = await fetchData<UserType>("/userdata");

      if (data) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));

        // Navigate to the goTo route
        const goTo = location.state?.from || "/dashboard";
        navigate(goTo);

        toast.success("Logged in successfully") // Toast
      }
      else {
        // Handle failure
        localStorage.removeItem("token");
        toast.error("Login failed");
      }
    }
    catch (error) {
      console.error("Login failed:", error);
      toast.error("Unexpected error during login");
    }
    finally {
      setLoading(false);
    }
  }


  /* Logout */
  function logout() {
    // Clear localStorage except "theme"
    const theme = localStorage.getItem("theme");
    localStorage.clear();
    if (theme) localStorage.setItem("theme", theme);

    setUser(null);

    toast.success("Logged out successfully");
    navigate("/login", {state: { from: location.pathname }, replace: true})
  }


  /* return */
  return (
    <UserContext.Provider value={{ user, isLoading, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};



/* Custom Hook */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};