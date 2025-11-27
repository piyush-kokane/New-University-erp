import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';


/* ===== Util Function ===== */
export async function fetchData<T>(endpoint: string): Promise<T | null> {
	try {
		await new Promise(resolve => setTimeout(resolve, 2000)); // simulate server delay

		const token = localStorage.getItem('token'); // get token

		const res = await fetch(endpoint, {
			headers: { Authorization: `Bearer ${token}` },
		});

		if (!res.ok) {
			const errorBody = await res.json();
			throw {
				status: res.status,
				message: errorBody?.message || "Server error"
			};
		}
		
		const data: T = await res.json();
		return data;
	}
	catch (error: any) {
		// Handle token expiration
		/*if (error.status === 401) {
			console.warn('🔴 Token expired or invalid. Logging out...');
			toast.error('Session expired. Please log in again');
			logout();
			return null;
		}*/

		console.error('Error fetching ' + endpoint, error);
		return null;
	}
}
