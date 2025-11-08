import { Routes, Route, Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import { useState } from 'react'
import { Toaster, toast } from "react-hot-toast";
import Dashboard from '@pages/student/Dashboard'
import LoginPage from '@pages/Login'
import Navbar from '@components/Navbar'
import SettingsPanel from "./panels/Settings";
import BG from '@/bg/BG1'
import './App.css'



const isAuthenticated = true
const isLoading = false

function ProtectedRoute({ element }: { element: ReactElement }) {
  // const { isAuthenticated, isLoading, logoutInProgress  } = useUser();
  
  if (isLoading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    toast.error("Please Login first");
    return <Navigate to="/" replace />;
  }

  return element;
}



function App() {
  const [profilePanel, setProfilePanel] = useState(false);
  const toggleProfilePanel  = () => setProfilePanel(!profilePanel);

  const [notificationPanel, setNotificationPanel] = useState(false);
  const toggleNotificationPanel = () => setNotificationPanel(!notificationPanel);

  const [settingsPanel, setSettingsPanel] = useState(false);
  const toggleSettingsPanel = () => setSettingsPanel(!settingsPanel);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);






  return (
    <>
      {/*
      <BG/>



      {settingsPanel && <SettingsPanel onClose={toggleSettingsPanel}/>}

      <Navbar
      isMenuActive={sidebarOpen}
        onMenuClick={toggleSidebar}
        onNotificationsClick={toggleNotificationPanel}
        onSettingsClick={toggleSettingsPanel}
        onProfileClick={toggleProfilePanel}
      />
      */}
      <Toaster position="top-center" reverseOrder={false} />


      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/login" element={<ProtectedRoute element={<LoginPage />} />} />
      </Routes>
    </>
  )
}

export default App
