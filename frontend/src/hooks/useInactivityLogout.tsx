import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';



/* ===================== MAIN FUNCTION ===================== */
export const useInactivityLogout = () => {
	const { logout, user } = useUser();

	const inactivityLimit = 60 * 60 * 1000; // 1 hour
	const warningTime = 55 * 60 * 1000; // 55 min


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
					toast.error('Inactivity Alert: You will be logged out soon.');
				}
			}, warningTime);

			/*** Logout Timer ***/
			logoutTimer = setTimeout(() => {
				const last = Number(localStorage.getItem('lastActivity'));
				const now = Date.now();

				if (now - last >= inactivityLimit) {
					// Auto logout
					logout(440);
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
};
