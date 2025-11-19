import { useNavigate } from 'react-router-dom';
import './styles/Navbar.css';


/* ===== Interface ===== */
interface NavbarProps {
	isMenuActive?: boolean;
	onMenuClick?: () => void;
	onNotificationsClick?: () => void;
	onSettingsClick?: () => void;
	onProfileClick?: () => void;
}


/* ===== Main Function ===== */
export default function Navbar({
	isMenuActive = false,
	onMenuClick,
	onNotificationsClick,
	onSettingsClick,
	onProfileClick,
}: NavbarProps) {

	const navigate = useNavigate();


	/* === UI === */
	return (
		<div className="nav-bar">
			{/*** Left Container ***/}
			<div className="left">
				<span
					className={`menu-btn  ${isMenuActive ? 'active' : ''}`}
					onClick={onMenuClick}
				>
					<span /> <span /> <span />
				</span>
				<h1 className="title">Dashboard</h1>
			</div>

			{/*** Search Bar Container ***/}
			<div className="middle">
				<span>
					<h1>search Bar</h1>
				</span>
			</div>

			{/*** Right Container ***/}
			<div className="right">
				<p className="link" onClick={() => navigate('/e-library')}>E-Library</p>
				<span className="material-icons icon" onClick={onNotificationsClick}>notifications</span>
				<span className="material-icons icon" onClick={onSettingsClick}>settings</span>
				<span className="material-icons icon profile" onClick={onProfileClick}>person</span>
			</div>
		</div>
	);
}
