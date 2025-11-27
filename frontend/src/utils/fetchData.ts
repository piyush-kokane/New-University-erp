export async function fetchData<T>(
	endpoint: string,
  onLogout?: (status: number) => void
): Promise<T | null> {
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
				message: errorBody?.message || "Server error",
			};
		}
		
		const data: T = await res.json();
		return data;
	}
	catch (error: any) {
		// Handle token expiration
		if (error.status === 401) {
			if (onLogout) onLogout(401);
			return null;
		}

		console.error('Error fetching ' + endpoint, error);
		return null;
	}
}
