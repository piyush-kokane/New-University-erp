import "./Toggle.css";

interface ToggleProps {
  enabled?: boolean;
  onToggle?: (value: boolean) => void;
}

export default function Toggle({ enabled = false, onToggle = () => {} }: ToggleProps) {
  return (
    <div
      className={`toggle-switch ${enabled ? "enabled" : ""}`}
      onClick={() => onToggle(!enabled)}
    >
      <div className="toggle-thumb" />
    </div>
  );
}
