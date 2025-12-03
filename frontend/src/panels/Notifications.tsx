import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '@/utils/fetchData';
import { useUser } from '@/hooks/useUser';
import { useUI } from '@/hooks/useUI';

import './styles/Notifications.css';



/* ===================== TYPES ===================== */
type Notification = {
	title: string;
	message: string;
	date: string;
	time: string;
};



/* ===================== MAIN FUNCTION ===================== */
export default function NotificationPanel() {
	const { logout } = useUser();

	const { toggleNotificationPanel } = useUI();

	const [closing, setClosing] = useState(false);
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);


	/* ___ Handle Closing ___ */
	const handleClose = () => {
		setClosing(true); // start animation
		setTimeout(() => toggleNotificationPanel(), 200); // delay must match animation duration (0.2s) // call close function after animation
	};


	/* ___ Fatch Notifications ___ */
	const fetchNotifications = async () => {
		setLoading(true);
		setError(false);

		const data = await fetchData<Notification[]>('/api/notifications', logout);
		if (data) {
			setNotifications(data);
			localStorage.setItem('notifications', JSON.stringify(data));
		}
		else {
			setError(true);
		}

		setLoading(false);
	};


	/* ___ Get Notifications ___ */
	useEffect(() => {
		const cached  = localStorage.getItem('notifications'); // get stored data

		if (cached) {
			setNotifications(JSON.parse(cached)); // parse string from localStorage
		}
		else {
			fetchNotifications(); // else fetch it
		}
	}, []);


	/* ====== UI ====== */
	return(
		<div className={`notification-panel bg-blur ${closing ? 'fade-out' : 'fade-in'}`} onClick={handleClose}>
			<div
				className={`notification-panel ${closing ? 'slide-out-right' : 'slide-in-left'}`}
				onClick={e => e.stopPropagation()}
			>

				{/*** HEADER ***/}
				<div className="header">
					<h1>Notifications</h1>
					<span className="material-icons refresh-btn" onClick={fetchNotifications}>cached</span>
					<span className="material-icons cancel-btn" onClick={handleClose}>close</span>
				</div>
				
				{/*** NOTIFICATIONS CONTAINER ***/}
				<div className="container">
					{loading && (
						<p className="_loading">Loading</p>
					)}

					{error && (
						<p className="_error">Something went wrong</p>
					)}

					{(!loading && !error && notifications.length === 0) && (
						<p className="_empty">No notifications</p>
					)}

					{!loading && !error && notifications.map((item, index) => (
						<div className="notification-item" key={index} >
							<h1>{item.title}</h1>
							<p>{item.message}</p>
							<div>
								<h2>{item.date}</h2>
								<h2>{item.time}</h2>
							</div>
							<div className="separator"/>
						</div>
					))}
				</div>

				{/*** FOOTER ***/}
				<div className="footer">
					<Link to="/notifications" onClick={handleClose}>See all ➜</Link>
				</div>

			</div>
		</div>
	);
}
