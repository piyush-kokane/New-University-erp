import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import profileFallbackImg from "/images/default-profile.png";
import bannerFallbackImg from "/images/default-banner.png";
import "./styles/Profile.css"


/* ===== Interface ===== */
interface ProfilePanelProps {
	onClose: () => void;
}


/* ===== Main Function ===== */
export default function ProfilePanel({onClose} : ProfilePanelProps){
	const [closing, setClosing] = useState(false);
	const navigate = useNavigate();

	const { user } = useUser();

	const profile = user?.profile;
	const banner = user?.banner;
	const fullName = user?.fullName;
	const prn = user?.prn;
	const branch = user?.branch;
	const shortBio = user?.shortBio;


	/* === Handle Closing === */
	const handleClose = () => {
		setClosing(true); // start animation
		setTimeout(() => onClose && onClose(), 200); // delay must match animation duration (0.2s) // call close function after animation
	};


	/* === UI === */
	return(
		<div className={`profile-panel bg-blur ${closing ? 'fade-out' : 'fade-in'}`} onClick={handleClose}>
			<div
				className={`profile-panel ${closing ? 'slide-out-up' : 'slide-in-down'}`}
				onClick={e => e.stopPropagation()}
			>
				<img 
					className="banner"
					src={banner}
					onError={(e) => {
						e.currentTarget.onerror = null;
						e.currentTarget.src = bannerFallbackImg;
					}}
				/>
				
				<span className="material-icons arrow">arrow_drop_up</span>
				
				<span className="material-icons cancel-btn" onClick={handleClose}>close</span>

				<div className="content">
					<img 
						src={profile}
						onError={(e) => {
							e.currentTarget.onerror = null;
							e.currentTarget.src = profileFallbackImg;
						}}
					/>

					<h1>{fullName}</h1>
					<h2>PRN: {prn}</h2>
					<h2>{branch}</h2>
					<div />
					<p>{shortBio}</p>
					<button onClick={() => {navigate("/profile"); handleClose(); }}>View Profile</button>
				</div>

			</div>
		</div>
	);
}
