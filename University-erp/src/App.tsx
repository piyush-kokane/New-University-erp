import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState, type ReactElement } from 'react'
import { Toaster, toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import Dashboard from '@pages/student/Dashboard'
import LoginPage from '@pages/Login'
import PolicyPage from '@pages/Policy_&_Conditions';
import Navbar from '@components/Navbar'
import SettingsPanel from '@panels/Settings';
import BG from '@/bg/BG1'
import './index.css'



// Protected pages for student
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

// Protected pages for faculty
const facultyRoutes = [
  { name: "Dashboard",     icon: "dashboard",     path: "/dashboard",     component: <Dashboard />,     status: "active" },
  { name: "Profile",       icon: "person",        path: "/profile",       component: <Dashboard />,       status: "active" },
  { name: "Attendance",    icon: "check_circle",  path: "/attendance",    component: <Dashboard />,    status: "active" },
  { name: "Calendar",      icon: "event",         path: "/calendar",      component: <Dashboard />,      status: "active" },
  { name: "Time Table",    icon: "schedule",      path: "/timetable",     component: <Dashboard />,    status: "active" },
  { name: "Circulars",     icon: "campaign",      path: "/circulars",     component: <Dashboard />,     status: "hidden" },
  { name: "Notifications", icon: "notifications", path: "/notifications", component: <Dashboard />, status: "hidden" },
];

// Protected pages for admin
const adminRoutes = [
  { name: "Dashboard",     icon: "dashboard",     path: "/dashboard",     component: <Dashboard />,        status: "active" },
  { name: "Calendar",      icon: "event",         path: "/calendar",      component: <Dashboard />, status: "active" },
  { name: "Time Table",    icon: "schedule",      path: "/timetable",     component: <Dashboard />, status: "active" },
  { name: "Circulars",     icon: "campaign",      path: "/circulars",     component: <Dashboard />, status: "active" },
  { name: "Notifications", icon: "notifications", path: "/notifications", component: <Dashboard />, status: "hidden" },
];

// all available routes 
const allRoutes: { [key: string]: string } = {
  landing: "/",

  login: "/login",

  policy: "/privacy-policy",
  conditions: "/terms-&-conditions",
};



/* ===== Main Function ===== */
export default function App() {
  const { user } = useUser();

  // To check on which type of page user is
  const [onUnknown, setOnUnknown] = useState(false);
  const [onLanding, setOnLanding] = useState(false);
  const [onLogin, setOnLogin] = useState(false);
  const [onPolicy, setOnPolicy] = useState(false);

  // To check if page contents is being fetch
  const [isLoadingPage, setLoadingPage] = useState(false);

  const [profilePanel, setProfilePanel] = useState(false);
  const toggleProfilePanel  = () => setProfilePanel(!profilePanel);

  const [notificationPanel, setNotificationPanel] = useState(false);
  const toggleNotificationPanel = () => setNotificationPanel(!notificationPanel);

  const [settingsPanel, setSettingsPanel] = useState(false);
  const toggleSettingsPanel = () => setSettingsPanel(!settingsPanel);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);


  // Set protectedRoutes based on Role
  const Role = user?.Role;
  const protectedRoutes = Role === "admin" ? adminRoutes : Role === "faculty" ? facultyRoutes : studentRoutes;

  // Add protectedRoutes to routes
  protectedRoutes.forEach((route) => {
    const key = route.name;
    allRoutes[key] = route.path;
  });

  // Convert to a Set for quick lookup
  const knownRoutes = new Set(Object.values(allRoutes));


  // Update states when route changes
  useEffect(() => {
    setOnUnknown(!knownRoutes.has(location.pathname));      // if user is on unknown page set onUnknown to true
    setOnLanding(location.pathname === allRoutes.landing); // check if user is on landg page if yes set onLanding to true
    setOnLogin(location.pathname === allRoutes.login);    // check if user is on landg page if yes set onLogin to true
    setOnPolicy(                                         // check if user is on privacy-policy or terms-&-conditions page if yes set onPolicy to true
      location.pathname === allRoutes.policy || 
      location.pathname === allRoutes.conditions
    );
  }, [location.pathname]);


  // Check if user is loggedin
  function ProtectedRoute({ element }: { element: ReactElement }) {
    // Page contexts is being fetched
    if (isLoadingPage) return <p>Loading...</p>;

    // If not loggedin redirect to login page
    if (!user) {
      toast.error("Please Login first");
      return <Navigate to={allRoutes.login} state={{ from: location.pathname }} replace />;
    }

    // else return element
    return element;
  }


  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />


      {/* Show Navigation & BG for Landing Page only */}
      {/* onLanding && <><L_Navigation /></> /*}


      {/* Show Navigation & BG for Protected Pages only */}
      {(!onLanding && !onLogin && !onPolicy && !onUnknown) && 
        <>
          <BG />
          <Navbar
            isMenuActive={sidebarOpen}
            onMenuClick={toggleSidebar}
            onNotificationsClick={toggleNotificationPanel}
            onSettingsClick={toggleSettingsPanel}
            onProfileClick={toggleProfilePanel}
          />
        </>
      }


      {(settingsPanel && !onLogin && !onPolicy && !onUnknown) &&
        <SettingsPanel onClose={toggleSettingsPanel}/>
      }
      

      <Routes>
        {/* Landing page */}
        <Route path={allRoutes.landing} element={<Dashboard />} />
        
        {/* Login page */}
        <Route path={allRoutes.login} element={<LoginPage />} />
                
        {/* privacy-policy & terms-&-conditions */}
        <Route path={allRoutes.policy} element={<PolicyPage />} />
        <Route path={allRoutes.conditions} element={<PolicyPage />} />

        {/* Protected pages */}
        {protectedRoutes.map(({ name, path, component }) => (
          <Route
            key={name}
            path={path}
            element={<ProtectedRoute element={component} />}
          />
        ))}

        {/* Unknown  Page */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </>
  )
}
