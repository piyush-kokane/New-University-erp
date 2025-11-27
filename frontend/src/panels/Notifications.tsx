import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { fetchData } from "@/utils/fetchData";
import "./styles/Notifications.css"


/* ===== Notification Panel Props ===== */
interface NotificationPanelProps {
	onClose: () => void;
}


/* ===== Notification Type ===== */
interface NotificationType {
  title: string;
  message: string;
  date: string;
  time: string;
}


/* ===== Main Function ===== */
export default function NotificationPanel({onClose} : NotificationPanelProps){
	const { logout } = useUser();

	const [closing, setClosing] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


	/* === Handle Closing === */
	const handleClose = () => {
		setClosing(true); // start animation
		setTimeout(() => onClose && onClose(), 200); // delay must match animation duration (0.2s) // call close function after animation
	};


	/* === Fatch notifications === */
	async function fetchNotifications() {
		setLoading(true);
		setError(false);

		const data = await fetchData<NotificationType[]>("/api/notifications", logout);
		if (data) {
			setNotifications(data);
			localStorage.setItem("notifications", JSON.stringify(data));
		}
		else {
			setError(true);
		}

		setLoading(false);
	}

	/* === Get notifications === */
  useEffect(() => {
		const cached  = localStorage.getItem('notifications'); // get stored data

		if (cached) {
			setNotifications(JSON.parse(cached)); // parse string from localStorage
		}
		else {
			fetchNotifications(); // else fetch it
		}
  }, []);


	/* === UI === */
	return(
		<div className={`notification-panel bg-blur ${closing ? 'fade-out' : 'fade-in'}`} onClick={handleClose}>
			<div
				className={`notification-panel ${closing ? 'slide-out-right' : 'slide-in-left'}`}
				onClick={e => e.stopPropagation()}
			>
        <div className="header">
          <h1>Notifications</h1>
          <span className="material-icons refresh-btn" onClick={fetchNotifications}>cached</span>
          <span className="material-icons cancel-btn" onClick={handleClose}>close</span>
        </div>
        
        <div className="container">
					{loading && 
						<p className="_loading">Loading</p>
					}
					{error && 
						<p className="_error">Something went wrong</p>
					}
					{(!loading && !error && notifications.length === 0) && 
						<p className="_empty">No notifications</p>
					}
          {!loading && !error && notifications.map((item, index) => (
						<div key={index} className={"notification-item"} >
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

        <div className="footer">
          <Link to="/notifications" onClick={handleClose}>See all ➜</Link>
        </div>
			</div>
		</div>
	);
}
