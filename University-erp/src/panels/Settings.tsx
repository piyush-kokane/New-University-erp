import { useState } from "react";
import toast from "react-hot-toast";
import ToggleSwitch from "@/components/ToggleSwitch";
import ToggleTheme from "@/components/ToggleTheme";
import './Settings.css'



interface SettingsPanelProps {
  onClose?: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [notifications, setNotifications] = useState(false);
  const handleNotificationsToggle = (value: boolean) => {
    setNotifications(value);
    toast.success(`Notifications ${value ? "enabled" : "disabled"}`);
  };

  const [email, setEmail] = useState(false);
    const handleEmailToggle = (value: boolean) => {
    setEmail(value);
    toast.success(`Email ${value ? "enabled" : "disabled"}`);
  };

  return (
    <div className='bg-blur' onClick={onClose}>
      <div className='settings-panel' onClick={(e) => e.stopPropagation()}>
        <span className="material-icons cancel-btn" onClick={onClose}>close</span>
        <h1>Settings</h1>

        {/* Theme toggle */}
        <div className="toggle-container">
          <h2>Theme</h2>
          <ToggleTheme />
        </div>

        {/* separator */}
        <div className="separator"/>

        {/* Notifications toggle */}
        <div className="toggle-container">
          <h2>Notifications</h2>
          <ToggleSwitch enabled={notifications} onToggle={handleNotificationsToggle} />
        </div>

         {/* separator */}
        <div className="separator"/>

        {/* email toggle */}
        <div className="toggle-container">
          <h2>Email</h2>
          <ToggleSwitch enabled={email} onToggle={handleEmailToggle} />
        </div>
      </div>
    </div>
  )
}

