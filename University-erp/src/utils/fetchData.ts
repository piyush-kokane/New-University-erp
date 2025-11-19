import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
const { logout } = useUser();


/* ===== Util Function ===== */
export async function fetchData<T>(src: string): Promise<T | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate server delay

    const endpoint = "http://localhost:5000/api" + src; // API endpoint
    const token = localStorage.getItem("token"); // JWT token

    const res = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error();

    const data: T = await res.json();
    return data;
  }
  catch (error: any) {
    // Handle token expiration
    if (error.status === 401) {
      console.warn("Token expired or invalid. Logging out...");
      toast.error("Session expired. Please log in again.");
      logout();
      return null;
    }
      
    console.error("Error fetching " + src + ":", error);
    return null;
  }
}