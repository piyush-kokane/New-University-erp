import './styles/Toggle.css';



/* ===================== PROPS ===================== */
interface ToggleProps {
  enabled?: boolean;
  onToggle?: (value: boolean) => void;
}



/* ===================== MAIN FUNCTION ===================== */
export default function Toggle({
  enabled = false,
  onToggle = () => {},
}: ToggleProps) {
  

  /* ====== UI ====== */
  return (
    <div
      className={`toggle-switch ${enabled ? 'enabled' : ''}`}
      onClick={() => onToggle(!enabled)}
    >
      <div className="toggle-thumb" />
    </div>
  );
}
