import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import { useUI } from '@/hooks/useUI';

import ToggleSwitch from '@/components/ToggleSwitch';
import ToggleTheme from '@/components/ToggleTheme';

import './styles/Settings.css';



/* ===================== MAIN FUNCTION ===================== */
export default function SettingsPanel() {
  const { user } = useUser();

  const { toggleSettingsPanel } = useUI();

  const [closing, setClosing] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [email, setEmail] = useState(false);


  /* ___ Handle Closing ___ */
  const handleClose = () => {
    setClosing(true); // start animation
    setTimeout(toggleSettingsPanel, 200); // delay must match animation duration (0.2s) // call close function after animation
  };


  /* ___ Notification Toggle ___ */
  const handleNotificationsToggle = (value: boolean) => {
    setNotifications(value);
    toast.success(`Notifications ${value ? 'enabled' : 'disabled'}`);
  };


  /* ___ Email Toggle ___ */
  const handleEmailToggle = (value: boolean) => {
    setEmail(value);
    toast.success(`Email ${value ? 'enabled' : 'disabled'}`);
  };


  /* ====== UI ====== */
  return (
    <div className={`bg-blur ${closing ? 'fade-out' : 'fade-in'}`} onClick={handleClose}>
      <div
        className={`settings-panel ${closing ? 'slide-out' : 'slide-in'}`}
        onClick={e => e.stopPropagation()}
      >

        {/*** CLOSE BUTTON ***/}
        <span className="material-icons cancel-btn" onClick={handleClose}>
          close
        </span>

        {/*** HEADER ***/}
        <h1>Settings</h1>

        {/*** THEME TOGGLE ***/}
        <div className="toggle-container">
          <h2>Theme</h2>
          <ToggleTheme />
        </div>

        {/*** NOTIFICATIONS TOGGLE ***/}
        {user && (
          <>
            <div className="separator" />
            <div className="toggle-container">
              <h2>Notifications</h2>
              <ToggleSwitch enabled={notifications} onToggle={handleNotificationsToggle} />
            </div>
          </>
        )}

        {/*** EMAIL TOGGLE ***/}
        {user && (
          <>
            <div className="separator" />
            <div className="toggle-container">
              <h2>Email</h2>
              <ToggleSwitch enabled={email} onToggle={handleEmailToggle} />
            </div>
          </>
        )}

      </div>
    </div>
  );
}
