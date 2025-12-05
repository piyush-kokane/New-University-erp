import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import { useUI } from '@/hooks/useUI';

import './styles/Service.css';



/* ===================== MAIN FUNCTION ===================== */
export default function Service() {
  const { user } = useUser();

  const { toggleServicePanel } = useUI();

  const [closing, setClosing] = useState(false);


  /* ___ Handle Closing ___ */
  const handleClose = () => {
    setClosing(true); // start animation
    setTimeout(() => toggleServicePanel(), 200); // delay must match animation duration (0.2s) // call close function after animation
  };


  /* ====== UI ====== */
  return (
    <div className={`bg-blur ${closing ? 'fade-out' : 'fade-in'}`} onClick={handleClose}>
      <div
        className={`service-panel ${closing ? 'slide-out' : 'slide-in'}`}
        onClick={e => e.stopPropagation()}
      >



      </div>
    </div>
  );
}
