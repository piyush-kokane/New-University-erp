import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { useUI } from '@/hooks/useUI';

import Searchbar from '@components/Searchbar';

import profileFallbackImg from '/images/default-profile.png';

import './styles/Navbar.css';



/* ===================== MAIN FUNCTION ===================== */
export default function Navbar() {
	const navigate = useNavigate();

	const { user } = useUser();

	const {
		activePage,
		sidebarOpen,
		toggleSidebar,
		toggleProfilePanel,
		toggleNotificationPanel,
		toggleSettingsPanel,
	} = useUI();


	/* ___ Searchbar Toggles for Small Screens ___ */
	const [searchActive, setSearchActive] = useState(false);
	const [focusInput, setFocusInput] = useState<null | (() => void)>(null);

	const enableSearchbar = () => {
		setSearchActive(true);
		setTimeout(() => focusInput?.(), 0);
	};

	const disableSearchbar = () => setSearchActive(false);


	/* ___ Small Screen Check ___ */
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);

	useEffect(() => {
		const handleResize = () => setIsSmallScreen(window.innerWidth <= 640);
		window.addEventListener('resize', handleResize); // listen for resize
		return () => window.removeEventListener('resize', handleResize); // cleanup on unmount
	}, []);


	/* ====== UI ====== */
	return (
		<div className="navbar">
			
			{/*** LEFT CONTAINER ***/}
			{(!isSmallScreen || !searchActive) && (
				<div className="left">
					<span
						className={`menu-btn  ${sidebarOpen ? 'active' : ''}`}
						onClick={toggleSidebar}
					>
						<span /> <span /> <span />
					</span>
					<h1 className="title">{activePage}</h1>
				</div>
			)}

			{/*** SEARCH BAR CONTAINER ***/}
			{(!isSmallScreen || searchActive) && (
				<div className="middle">
					<Searchbar
						focus={setFocusInput}
						onBlurEmpty={disableSearchbar}
					/>
				</div>
			)}

			{/*** RIGHT CONTAINER ***/}
			{(!isSmallScreen || !searchActive) && (
				<div className="right">
					<Link to="/e-library" className="link" target="_blank" rel="noopener noreferrer">E-Library</Link>
					
					{isSmallScreen && <span className="material-icons nav-icon nav-search-btn" onClick={enableSearchbar}>search</span>}
					
					{user && <span className="material-icons nav-icon" onClick={toggleNotificationPanel}>notifications</span>}

					<span className="material-icons nav-icon" onClick={toggleSettingsPanel}>settings</span>

					{user 
						? <img
								className="profile-img"
								src={user.profile}
								onClick={toggleProfilePanel}
								onError={(e) => {
									e.currentTarget.onerror = null;
									e.currentTarget.src = profileFallbackImg;
								}}
							/>
						: <span className="material-icons profile-icon" title="Login" onClick={() =>navigate("/login", { state: { from: location.pathname } })}>person</span>
					}
				</div>
			)}

		</div>
	);
}
