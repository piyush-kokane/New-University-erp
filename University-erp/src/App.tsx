import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState, type ReactElement } from 'react'
import { Toaster, toast } from "react-hot-toast";
import useInactivityLogout from "@/hooks/useInactivityLogout";
import { useUser } from "@/hooks/useUser";

import PageNotFound from "@pages/PageNotFound";
import Dashboard from '@pages/student/Dashboard'
import LoginPage from '@pages/Login'
import PolicyPage from '@pages/Policy_&_Conditions';

import Navbar from '@components/Navbar'
import Sidebar from '@components/Sidebar'
import SettingsPanel from '@panels/Settings';

import BG1 from '@/bg/BG1';
import BG2 from '@/bg/BG2';

import './index.css'



 /* ---------------------------------------------------------------------------------------------------- */
/* ===== Routes ===== */

	const studentRoutes = [
		{ name: "Dashboard",     icon: "dashboard",     path: "/dashboard",     component: <Dashboard />,     status: "active" },
		{ name: "Profile",       icon: "person",        path: "/profile",       component: <Dashboard />,       status: "active" },
		{ name: "Attendance",    icon: "check_circle",  path: "/attendance",    component: <Dashboard />,    status: "active" },
		{ name: "Calendar",      icon: "event",         path: "/calendar",      component: <Dashboard />,      status: "active" },
		{ name: "Time Table",    icon: "schedule",      path: "/timetable",     component: <Dashboard />,    status: "active" },
		{ name: "Course",        icon: "menu_book",     path: "/course",        component: <Dashboard />,        status: "active" },
		{ name: "Result",        icon: "bar_chart",     path: "/result",        component: <Dashboard />,        status: "active" },
		{ name: "Circulars",     icon: "campaign",      path: "/circulars",     component: <Dashboard />,     status: "hidden" },
		{ name: "Notifications", icon: "notifications", path: "/notifications", component: <Dashboard />, status: "hidden" },
	];

	const facultyRoutes = [
		{ name: "Dashboard",     icon: "dashboard",     path: "/dashboard",     component: <Dashboard />,     status: "active" },
		{ name: "Profile",       icon: "person",        path: "/profile",       component: <Dashboard />,       status: "active" },
		{ name: "Attendance",    icon: "check_circle",  path: "/attendance",    component: <Dashboard />,    status: "active" },
		{ name: "Calendar",      icon: "event",         path: "/calendar",      component: <Dashboard />,      status: "active" },
		{ name: "Time Table",    icon: "schedule",      path: "/timetable",     component: <Dashboard />,    status: "active" },
		{ name: "Circulars",     icon: "campaign",      path: "/circulars",     component: <Dashboard />,     status: "hidden" },
		{ name: "Notifications", icon: "notifications", path: "/notifications", component: <Dashboard />, status: "hidden" },
	];

	const adminRoutes = [
		{ name: "Dashboard",     icon: "dashboard",     path: "/dashboard",     component: <Dashboard />,        status: "active" },
		{ name: "Calendar",      icon: "event",         path: "/calendar",      component: <Dashboard />, status: "active" },
		{ name: "Time Table",    icon: "schedule",      path: "/timetable",     component: <Dashboard />, status: "active" },
		{ name: "Circulars",     icon: "campaign",      path: "/circulars",     component: <Dashboard />, status: "active" },
		{ name: "Notifications", icon: "notifications", path: "/notifications", component: <Dashboard />, status: "hidden" },
	];

	// Public Routes 
	const publicRoutes: { [key: string]: string } = {
		landing: "/",
		login: "/login",
		policy: "/privacy-policy",
		conditions: "/terms-&-conditions",
	};



 /* ---------------------------------------------------------------------------------------------------- */
/* ===== Main Function ===== */
export default function App() {
	const location = useLocation();
  const { user, loggingOut } = useUser();

	
	/* === UI State === */
	const [activePage, setActivePage] = useState('');
  const [profilePanel, setProfilePanel] = useState(false);
  const [notificationPanel, setNotificationPanel] = useState(false);
  const [settingsPanel, setSettingsPanel] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);


	/* === Toggle UI State === */
  const toggleProfilePanel  = () => setProfilePanel(prev => !prev);
  const toggleNotificationPanel = () => setNotificationPanel(prev => !prev);
  const toggleSettingsPanel = () => setSettingsPanel(prev => !prev);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);


  /* === Role Based Routes === */
  const Role = user?.Role;
  const protectedRoutes = Role === 'admin' ? adminRoutes : Role === 'faculty' ? facultyRoutes : studentRoutes;
  const protectedRoutesSet = new Set(protectedRoutes.map(r => r.path));	// Set of Protected Routes (for quick lookup)


	
  /* === Page Flags ===*/
  const onProtected = protectedRoutesSet.has(location.pathname); // if user is on protected page
  const onLanding = location.pathname === publicRoutes.landing; // if user is on landg page
  const onLogin = location.pathname === publicRoutes.login; 	 // if user is on login page
  const onPolicy = 																						// if user is on privacy-policy or terms-&-conditions page
    location.pathname === publicRoutes.policy ||
    location.pathname === publicRoutes.conditions;
	const onUnknown = !onLanding && !onProtected && !onLogin && !onPolicy // if user is on unknown page


  /* === Update Active Page ===*/
  useEffect(() => {
    const currentPage = protectedRoutes.find(i => i.path === location.pathname);
    setActivePage(currentPage?.name || '');
  }, [location.pathname]);


	/* === Inactivity - Auto Logout === */
	useInactivityLogout();


  /* === Check if user is loggedin === */
  function ProtectedRoute({ element }: { element: ReactElement }) {
    // If not loggedin redirect to login page
    if (!user && !loggingOut) {
      toast.error('Please Login first');
      return <Navigate to={publicRoutes.login} state={{ from: location.pathname }} replace />;
    }

    // else return element
    return element;
  }


	/* === UI === */
  return (
    <>
			{/*** Toaster ***/}
      <Toaster position="top-center" reverseOrder={false} />

      {/*** Backgrounds ***/}
      {onProtected && <BG1 />}
      {(onLogin || onPolicy || onUnknown) && <BG2 />}

			{/*** Settings Panel ***/}
      {(settingsPanel && onProtected) &&
        <SettingsPanel onClose={toggleSettingsPanel} />
      }

      {/*** Navbar + Sidebar for Landing Page ***/}
      {/* onLanding && 
				<>
					<L_Navigation />
				</>
			*/}

      {/*** Navbar + Sidebar for Protected Pages ***/}
      {onProtected && 
        <>
          <Navbar
            sidebarOpen={sidebarOpen}
						activePage={activePage}
            onMenuClick={toggleSidebar}
            onNotificationsClick={toggleNotificationPanel}
            onSettingsClick={toggleSettingsPanel}
            onProfileClick={toggleProfilePanel}
          />
					<Sidebar 
						sidebarOpen={sidebarOpen}
						menuItems={protectedRoutes}
						activeMenuItem={activePage}
						setSideBarOpen={setSidebarOpen}
					/>
        </>
      }
      
			{/*** Routes ***/}
      <Routes>
        {/* Landing page */}
        <Route path={publicRoutes.landing} element={<Dashboard />} />
        
        {/* Login page */}
        <Route path={publicRoutes.login} element={<LoginPage />} />
                
        {/* privacy-policy & terms-&-conditions */}
        <Route path={publicRoutes.policy} element={<PolicyPage />} />
        <Route path={publicRoutes.conditions} element={<PolicyPage />} />

        {/* Protected pages */}
        {protectedRoutes.map(({ name, path, component }) => (
          <Route
            key={name}
            path={path}
            element={<ProtectedRoute element={component} />}
          />
        ))}	

        {/* Unknown  Page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}
