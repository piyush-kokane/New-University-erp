import { useState } from 'react';
import toast from 'react-hot-toast';
import ToggleSwitch from '@/components/ToggleSwitch';
import ToggleTheme from '@/components/ToggleTheme';
import './styles/Settings.css';


/* ===== Interface ===== */
interface SettingsPanelProps {
	onClose?: () => void;
}


/* ===== Main Function ===== */
export default function SettingsPanel({ onClose }: SettingsPanelProps) {
	/* === Handle Closing === */
	const [closing, setClosing] = useState(false);
	const handleClose = () => {
		setClosing(true); // start animation
		setTimeout(() => onClose && onClose(), 200); // delay, Matches animation duration (0.3s) // Call close function after animation
	};


	/* === Notification Toggle === */
	const [notifications, setNotifications] = useState(false);
	const handleNotificationsToggle = (value: boolean) => {
		setNotifications(value);
		toast.success(`Notifications ${value ? 'enabled' : 'disabled'}`);
	};


	/* === Email Toggle === */
	const [email, setEmail] = useState(false);
	const handleEmailToggle = (value: boolean) => {
		setEmail(value);
		toast.success(`Email ${value ? 'enabled' : 'disabled'}`);
	};


	/* === UI === */
	return (
		<div className={`bg-blur ${closing ? 'fade-out' : 'fade-in'}`} onClick={handleClose}>
			<div
				className={`settings-panel ${closing ? 'slide-out' : 'slide-in'}`}
				onClick={e => e.stopPropagation()}
			>
				{/*** Close Button ***/}
				<span className="material-icons cancel-btn" onClick={handleClose}>
					close
				</span>
				<h1>Settings</h1>

				{/*** Theme Toggle ***/}
				<div className="toggle-container">
					<h2>Theme</h2>
					<ToggleTheme />
				</div>

				{/*** Separator ***/}
				<div className="separator" />

				{/*** Notifications Toggle ***/}
				<div className="toggle-container">
					<h2>Notifications</h2>
					<ToggleSwitch enabled={notifications} onToggle={handleNotificationsToggle} />
				</div>

				{/*** Separator ***/}
				<div className="separator" />

				{/*** Email Toggle ***/}
				<div className="toggle-container">
					<h2>Email</h2>
					<ToggleSwitch enabled={email} onToggle={handleEmailToggle} />
				</div>
			</div>
		</div>
	);
}
