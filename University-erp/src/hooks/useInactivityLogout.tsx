import { useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';


/* ===== Main Function ===== */
export default function useInactivityLogout() {
	const inactivityLimit = 60 * 60 * 1000; // 1 hour
	const warningTime = 55 * 60 * 1000; // 55 min
	const { logout, user } = useUser();

	useEffect(() => {
		if (!user) return; 

		let warningTimer: ReturnType<typeof setTimeout>;
		let logoutTimer: ReturnType<typeof setTimeout>;

		const resetTimer = () => {
			clearTimeout(warningTimer);
			clearTimeout(logoutTimer);

			localStorage.setItem('lastActivity', Date.now().toString());

			/*** Warning Timer ***/
			warningTimer = setTimeout(() => {
				const last = Number(localStorage.getItem('lastActivity'));
				const now = Date.now();

				if (now - last >= warningTime) {
					// Warning
					console.warn('🟠 Inactivaty Alert');
          toast.error("Inactivity Alert: You will be logged out soon.");
				}
			}, warningTime);

			/*** Logout Timer ***/
			logoutTimer = setTimeout(() => {
				const last = Number(localStorage.getItem('lastActivity'));
				const now = Date.now();

				if (now - last >= inactivityLimit) {
					// Auto logout
					console.warn('🔴 Logging out due to inactivaty');
					toast.error('Logging out due to inactivaty');
					logout();
				}
			}, inactivityLimit);
		};

		const events = ['mousemove', 'click', 'keydown', 'scroll', 'touchstart'];

		events.forEach(event => window.addEventListener(event, resetTimer));

		resetTimer(); // start timer immediately

		return () => {
			events.forEach(event => window.removeEventListener(event, resetTimer));
			clearTimeout(warningTimer);
			clearTimeout(logoutTimer);
		};
	}, [user, logout]);
}
