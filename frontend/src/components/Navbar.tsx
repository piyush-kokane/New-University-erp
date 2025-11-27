import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUser } from "@/hooks/useUser";
import Searchbar from '@components/Searchbar';
import profileFallbackImg from "/images/default-profile.png";
import './styles/Navbar.css';


/* ===== Interface ===== */
interface NavbarProps {
	sidebarOpen: boolean;
	activePage: string;
	onMenuClick?: () => void;
	onNotificationsClick?: () => void;
	onSettingsClick?: () => void;
	onProfileClick?: () => void;
}


/* ===== Main Function ===== */
export default function Navbar({
	sidebarOpen,
	activePage,
	onMenuClick,
	onNotificationsClick,
	onSettingsClick,
	onProfileClick,
}: NavbarProps) {

	const navigate = useNavigate();
	const { user } = useUser();


	/* === Searchbar toggles for small screens === */
	const [searchActive, setSearchActive] = useState(false);
	const [focusInput, setFocusInput] = useState<null | (() => void)>(null);

	const enableSearchbar = () => {
		setSearchActive(true);
		setTimeout(() => focusInput?.(), 0);
	};

  const disableSearchbar  = () => setSearchActive(false);


	/* === Small Screen Check === */
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);

	useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize); // listen for resize
    return () => window.removeEventListener('resize', handleResize); // cleanup on unmount
  }, []);


	/* === UI === */
	return (
		<div className="navbar">
			{/*** Left Container ***/}
			{(!isSmallScreen || !searchActive) &&
				<div className="left">
					<span
						className={`menu-btn  ${sidebarOpen ? 'active' : ''}`}
						onClick={onMenuClick}
					>
						<span /> <span /> <span />
					</span>
					<h1 className="title">{activePage}</h1>
				</div>
			}

			{/*** Search Bar Container ***/}
			{(!isSmallScreen || searchActive) &&
				<div className="middle">
					<Searchbar
						onReady={setFocusInput}
						onBlurEmpty={disableSearchbar}
					/>
				</div>
			}

			{/*** Right Container ***/}
			{(!isSmallScreen || !searchActive) &&
				<div className="right">
					<Link to="/e-library" className="link" target="_blank" rel="noopener noreferrer">E-Library</Link>
					{isSmallScreen && <span className="material-icons nav-icon nav-search-btn" onClick={enableSearchbar}>search</span>}
					
					{ user &&
						<span className="material-icons nav-icon" onClick={onNotificationsClick}>notifications</span>
					}

					<span className="material-icons nav-icon" onClick={onSettingsClick}>settings</span>

					{ user 
						? <img
								className="profile-img"
								src={user.profile}
								onClick={onProfileClick}
								onError={(e) => {
									e.currentTarget.onerror = null;
									e.currentTarget.src = profileFallbackImg;
								}}
							/>
						: <span className="material-icons profile-icon" onClick={() =>navigate("/login", { state: { from: location.pathname } })}>person</span>
					}
				</div>
			}
		</div>
	);
}
