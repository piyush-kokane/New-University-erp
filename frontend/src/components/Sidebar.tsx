import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import './styles/Sidebar.css';


/* ===== Type for menuItems ===== */
type MenuItem = {
	name: string;
	icon: string;
	path: string;
	status: string;
};


/* ===== Interface ===== */
interface SidebarProps {
	sidebarOpen: boolean;
	menuItems: MenuItem[];
	activeMenuItem: string;
	setSideBarOpen: (value: boolean) => void;
}


/* ===== Main Function ===== */
export default function Sidebar({
	sidebarOpen,
	menuItems,
	activeMenuItem,
	setSideBarOpen,
}: SidebarProps) {

	const navigate = useNavigate();
	const { logout } = useUser();


	/* === Handle logout logic === */
	const handleLogout = () => {
		setSideBarOpen(false)
    logout();
  };

	
	/* === UI === */
	return (
		<div
			className={`sidebar ${sidebarOpen ? 'open' : ''}`}
			onMouseEnter={() => setSideBarOpen(true)}
			onMouseLeave={() => setSideBarOpen(false)}
		>
			<nav className="menu">
				{menuItems.map((item: MenuItem) =>
					item.status === 'active' || item.path === location.pathname ? ( // only show Active Tabs
						<button
							key={item.name}
							className={`item ${activeMenuItem === item.name ? 'active' : ''}`}
							onClick={() => navigate(item.path)}
						>
							<span className="material-icons icon">{item.icon}</span>
							<span className={`text ${sidebarOpen ? 'visible' : ''}`}>{item.name}</span>
						</button>
					) : null
				)}
			</nav>

			{/* Logout Button */}
			<button className="item logout-btn" onClick={handleLogout}>
				<span className="material-icons icon">logout</span>
				<span className={`text ${sidebarOpen ? 'visible' : ''}`}>Logout</span>
			</button>
		</div>
	);
}
