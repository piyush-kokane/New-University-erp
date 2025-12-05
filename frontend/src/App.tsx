import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useMemo, type ReactElement } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useInactivityLogout } from '@/hooks/useInactivityLogout';
import { useUser } from '@/hooks/useUser';
import { useUI } from '@hooks/useUI';

import LoginPage from '@pages/Login';
import LandingPage from '@pages/Landing';
import PageNotFound from '@pages/PageNotFound';
import PolicyPage from '@pages/Policy_&_Conditions';
import Dashboard from '@pages/student/Dashboard'

import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import ServicePanel from '@panels/Service';
import SettingsPanel from '@panels/Settings';
import NotificationPanel from '@panels/Notifications';
import ProfilePanel from '@panels/Profile';

import BG1 from '@/bg/BG1';
import BG2 from '@/bg/BG2';

import './index.css';



/* ===================== ROUTES ===================== */

const landingRoutes = [
  { name: 'Dashboard',     icon: 'dashboard',     path: '/dashboard',     component: <Dashboard />,     status: 'active' },
  { name: 'Profile',       icon: 'person',        path: '/profile',       component: <Dashboard />,       status: 'active' },
  { name: 'Attendance',    icon: 'check_circle',  path: '/attendance',    component: <Dashboard />,    status: 'active' },
  { name: 'Calendar',      icon: 'event',         path: '/calendar',      component: <Dashboard />,      status: 'active' },
  { name: 'Time Table',    icon: 'schedule',      path: '/timetable',     component: <Dashboard />,    status: 'active' },
  { name: 'Course',        icon: 'menu_book',     path: '/course',        component: <Dashboard />,        status: 'active' },
  { name: 'Result',        icon: 'bar_chart',     path: '/result',        component: <Dashboard />,        status: 'active' },
  { name: 'Circulars',     icon: 'campaign',      path: '/circulars',     component: <Dashboard />,     status: 'hidden' },
  { name: 'Notifications', icon: 'notifications', path: '/notifications', component: <Dashboard />, status: 'hidden' },
];

const studentRoutes = [
  { name: 'Dashboard',     icon: 'dashboard',     path: '/dashboard',     component: <Dashboard />,     status: 'active' },
  { name: 'Profile',       icon: 'person',        path: '/profile',       component: <Dashboard />,       status: 'active' },
  { name: 'Attendance',    icon: 'check_circle',  path: '/attendance',    component: <Dashboard />,    status: 'active' },
  { name: 'Calendar',      icon: 'event',         path: '/calendar',      component: <Dashboard />,      status: 'active' },
  { name: 'Time Table',    icon: 'schedule',      path: '/timetable',     component: <Dashboard />,    status: 'active' },
  { name: 'Course',        icon: 'menu_book',     path: '/course',        component: <Dashboard />,        status: 'active' },
  { name: 'Result',        icon: 'bar_chart',     path: '/result',        component: <Dashboard />,        status: 'active' },
  { name: 'Circulars',     icon: 'campaign',      path: '/circulars',     component: <Dashboard />,     status: 'hidden' },
  { name: 'Notifications', icon: 'notifications', path: '/notifications', component: <Dashboard />, status: 'hidden' },
];

const facultyRoutes = [
  { name: 'Dashboard',     icon: 'dashboard',     path: '/dashboard',     component: <Dashboard />,     status: 'active' },
  { name: 'Profile',       icon: 'person',        path: '/profile',       component: <Dashboard />,       status: 'active' },
  { name: 'Attendance',    icon: 'check_circle',  path: '/attendance',    component: <Dashboard />,    status: 'active' },
  { name: 'Calendar',      icon: 'event',         path: '/calendar',      component: <Dashboard />,      status: 'active' },
  { name: 'Time Table',    icon: 'schedule',      path: '/timetable',     component: <Dashboard />,    status: 'active' },
  { name: 'Circulars',     icon: 'campaign',      path: '/circulars',     component: <Dashboard />,     status: 'hidden' },
  { name: 'Notifications', icon: 'notifications', path: '/notifications', component: <Dashboard />, status: 'hidden' },
];

const adminRoutes = [
  { name: 'Dashboard',     icon: 'dashboard',     path: '/dashboard',     component: <Dashboard />, status: 'active' },
  { name: 'Calendar',      icon: 'event',         path: '/calendar',      component: <Dashboard />, status: 'active' },
  { name: 'Time Table',    icon: 'schedule',      path: '/timetable',     component: <Dashboard />, status: 'active' },
  { name: 'Circulars',     icon: 'campaign',      path: '/circulars',     component: <Dashboard />, status: 'active' },
  { name: 'Notifications', icon: 'notifications', path: '/notifications', component: <Dashboard />, status: 'hidden' },
];

// Public Routes 
const publicRoutes: { [key: string]: string } = {
  landing: '/',
  login: '/login',
  policy: '/privacy-policy',
  terms: '/terms-&-conditions',
};



/* ===================== NAVBAR + SIDEBAR + PANELS + (Scroll To Top) + (Route Change Side Effects) ===================== */
function Isolated_Layout() {
  const location = useLocation();
  const path = location.pathname;

  const { user } = useUser();
  
  const {
    profilePanel,
    notificationPanel,
    settingsPanel,
    servicePanel,
    setActivePage,
  } = useUI();


  /* ___ Role Based Routes ___ */
  const role = user?.role;
  const protectedRoutes = useMemo(() => {
    if (role === 'admin') return adminRoutes;
    if (role === 'faculty') return facultyRoutes;
    return studentRoutes;
  }, [role]);
  

  /* ___ Set of Protected Routes (for quick lookup) ___ */
  const protectedRoutesMap = useMemo(
    () => new Set(protectedRoutes.map(r => r.path)),
    [protectedRoutes]
  );	


  /* ___ Page Flags ___ */
  const onProtected = protectedRoutesMap.has(path); // if user is on protected page
  const onLanding = path === publicRoutes.landing; // if user is on landg page
  const onPolicy = path === publicRoutes.policy;  // if user is on privacy-policy page
  const onTerms = path === publicRoutes.terms;   // if user is on terms-&-conditions page
  const onLogin = path === publicRoutes.login;  // if user is on login page

  const onUnknown = !onLanding && !onProtected && !onLogin && !onPolicy && !onTerms; // if user is on unknown page

  const showUI = onLanding || onProtected; // common condition for ui components


  /* ___ Update Active Page ___ */
  useEffect(() => {
    const activePage = protectedRoutes.find(i => i.path === path);
    setActivePage(activePage?.name || 'MIT-WPU');
  }, [path]);

  
  /* ___ Route Change Side Effects ___ */
  useEffect(() => {
    // Update active page
    const activePage = protectedRoutes.find(i => i.path === path);
    setActivePage(activePage?.name || 'MIT-WPU');
    
    // Change page title
    if (onProtected) document.title = 'MIT-WPU-ERP';
    if (onLanding) document.title = 'MIT-WPU';
    if (onPolicy) document.title = 'Privacy Policy';
    if (onTerms) document.title = 'Terms & Conditions';
    if (onLogin) document.title = 'Login';
  }, [path]);
  

  /* ___ Scroll To Top ___ */
  useEffect(() => {
    const page = document.querySelector('.page-container') as HTMLElement | null;
    if (page) {
      page.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [location]);


  /* ====== UI ====== */
  return (
    <>
      {/*** BACKGROUNDS ***/}
      {onProtected && <BG1 />}
      {(onLogin || onPolicy || onTerms || onUnknown) && <BG2 />}

      {/*** NAVBAR ***/}
      {showUI && <Navbar />}

      {/*** SIDEBAR ***/}
      {onLanding && <Sidebar menuItems={landingRoutes} />}
      {onProtected && <Sidebar menuItems={protectedRoutes} />}

      {/*** PANELS ***/}
      {(showUI && profilePanel) && <ProfilePanel />}
      {(showUI && servicePanel) && <ServicePanel />}
      {(showUI && settingsPanel) && <SettingsPanel />}
      {(showUI && notificationPanel) && <NotificationPanel />}
    </>
  );
}



/* ===================== AUTH GUARD (Protected Route) ===================== */
function ProtectedRoute({ element }: { element: ReactElement }) {
  const location = useLocation();
  const { user, loggingOut } = useUser();

  if (!user && !loggingOut) {
    toast.error('Please Login first');
    return <Navigate to={publicRoutes.login} state={{ from: location.pathname }} replace />;
  }

  return element;
}



/* ===================== MAIN FUNCTION ===================== */
export default function App() {
  const { user } = useUser();


  /* ___ Role Based Routes ___ */
  const role = user?.role;
  const protectedRoutes = useMemo(() => {
    if (role === 'admin') return adminRoutes;
    if (role === 'faculty') return facultyRoutes;
    return studentRoutes;
  }, [role]);


  /* ___ Inactivity - Auto Logout ___ */
  useInactivityLogout();


  /* ====== UI ====== */
  return (
    <>
      <Isolated_Layout />

      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Landing */}
        <Route path={publicRoutes.landing} element={<LandingPage />} />
        
        {/* Public */}
        <Route path={publicRoutes.login} element={<LoginPage />} />
        <Route path={publicRoutes.policy} element={<PolicyPage />} />
        <Route path={publicRoutes.terms} element={<PolicyPage />} />

        {/* Protected */}
        {protectedRoutes.map(({ name, path, component }) => (
          <Route
            key={name}
            path={path}
            element={<ProtectedRoute element={component} />}
          />
        ))}	

        {/* Unknown */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
