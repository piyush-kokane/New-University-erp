import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Searchbar from '@components/Searchbar';
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
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 40);
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
					<span className="material-icons nav-icon" onClick={onNotificationsClick}>notifications</span>
					<span className="material-icons nav-icon" onClick={onSettingsClick}>settings</span>
					<span className="material-icons nav-icon profile" onClick={onProfileClick}>person</span>
				</div>
			}
		</div>
	);
}
