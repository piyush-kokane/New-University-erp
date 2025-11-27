import { useTheme } from '@/hooks/useTheme';
import './styles/Toggle.css';


/* ===== Main Function ===== */
export default function Toggle() {
  const { isDark, toggleTheme } = useTheme();


	/* === UI === */
  return (
    <div
      className={`toggle-switch theme ${isDark ? 'enabled' : ''}`}
      onClick={() => toggleTheme()}
    >
      <div className="toggle-thumb theme">
        <span className="material-icons">
          {isDark ? 'dark_mode' : 'light_mode'}
        </span>
      </div>
    </div>
  );
}
