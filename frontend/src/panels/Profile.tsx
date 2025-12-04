import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { useUI } from '@/hooks/useUI';

import profileFallbackImg from '/images/default-profile.png';
import bannerFallbackImg from '/images/default-banner.png';

import './styles/Profile.css';



/* ===================== MAIN FUNCTION ===================== */
export default function ProfilePanel() {
  const navigate = useNavigate();

  const [closing, setClosing] = useState(false);

  const { toggleProfilePanel } = useUI();

  const { user } = useUser();

  const profile = user?.profile;
  const banner = user?.banner;
  const fullName = user?.fullName;
  const prn = user?.prn;
  const branch = user?.branch;
  const shortBio = user?.shortBio;


  /* ___ Handle Closing ___ */
  const handleClose = () => {
    setClosing(true); // start animation
    setTimeout(() => toggleProfilePanel(), 200); // delay must match animation duration (0.2s) // call close function after animation
  };


  /* ====== UI ====== */
  return(
    <div className={`profile-panel bg-blur ${closing ? 'fade-out' : 'fade-in'}`} onClick={handleClose}>
      <div
        className={`profile-panel ${closing ? 'slide-out-up' : 'slide-in-down'}`}
        onClick={e => e.stopPropagation()}
      >

        {/*** BANNER IMG ***/}
        <img 
          className="banner"
          src={banner}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = bannerFallbackImg;
          }}
        />
        
        {/*** BANNER IMG ***/}
        <span className="material-icons arrow">arrow_drop_up</span>
        
        {/*** CLOSE BUTTON ***/}
        <span className="material-icons cancel-btn" onClick={handleClose}>close</span>

        {/*** CONTENT ***/}
        <div className="content">

          {/* Profile Img */}
          <img 
            src={profile}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = profileFallbackImg;
            }}
          />

          {/* Details */}
          <h1>{fullName}</h1>
          <h2>PRN: {prn}</h2>
          <h2>{branch}</h2>
          <div />
          <p>{shortBio}</p>

          {/* Profile Page Button */}
          <button onClick={() => {navigate("/profile"); handleClose(); }}>View Profile</button>
          
        </div>

      </div>
    </div>
  );
}
