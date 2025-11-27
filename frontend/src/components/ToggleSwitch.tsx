import './styles/Toggle.css';


/* ===== Interface ===== */
interface ToggleProps {
  enabled?: boolean;
  onToggle?: (value: boolean) => void;
}


/* ===== Main Function ===== */
export default function Toggle({
  enabled = false,
  onToggle = () => {},
}: ToggleProps) {
	

	/* === UI === */
  return (
    <div
      className={`toggle-switch ${enabled ? 'enabled' : ''}`}
      onClick={() => onToggle(!enabled)}
    >
      <div className="toggle-thumb" />
    </div>
  );
}
