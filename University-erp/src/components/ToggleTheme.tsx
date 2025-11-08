import { useTheme } from "@/hooks/useTheme";
import "./Toggle.css";

export default function Toggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`toggle-switch theme ${isDark ? "enabled" : ""}`} onClick={() => toggleTheme()}>
      <div className="toggle-thumb theme">
        <span className="material-icons">
          {isDark ? "dark_mode" : "light_mode"}
        </span>
      </div>
    </div>
  );
}
