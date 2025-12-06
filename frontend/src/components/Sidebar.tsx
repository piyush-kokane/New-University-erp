import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { useUI } from '@/hooks/useUI';

import './styles/Sidebar.css';



/* ===================== TYPES ===================== */
type MenuItem = {
  name: string;
  icon: string;
  path: string;
  status: string;
};



/* ===================== PROPS ===================== */
interface SidebarProps {
  menuItems: MenuItem[];
}



/* ===================== MAIN FUNCTION ===================== */
export default function Sidebar({ menuItems }: SidebarProps) {
  const navigate = useNavigate();

  const { user, logout } = useUser();

  const {
    activePage,
    sidebarOpen,
    setSidebarOpen,
  } = useUI();


  /* ___ Handle Logout Logic ___ */
  const handleLogout = () => {
    setSidebarOpen(false);
    logout();
  };

  
  /* ====== UI ====== */
  return (
    <div
      className={`sidebar ${sidebarOpen ? 'open' : ''}`}
      onMouseEnter={() => user && setSidebarOpen(true)}
      onMouseLeave={() => user && setSidebarOpen(false)}
    >

      {/* Menu Button */}
      <nav className="menu">
        {menuItems.map((item: MenuItem) =>
          ((item.status === 'active') || (item.path === location.pathname)) // only show active tabs
            ? <button
                key={item.name}
                className={`item ${activePage === item.name ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="material-icons icon">{item.icon}</span>
                <span className={`text ${sidebarOpen ? 'visible' : ''}`}>{item.name}</span>
              </button>
            : null
        )}
      </nav>

      {/* Logout Button */}
      {user && (
        <button className="item logout-btn" onClick={handleLogout}>
          <span className="material-icons icon">logout</span>
          <span className={`text ${sidebarOpen ? 'visible' : ''}`}>Logout</span>
        </button>
      )}

    </div>
  );
}
