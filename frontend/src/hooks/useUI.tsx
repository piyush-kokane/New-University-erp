import { createContext, useContext, useState, type ReactNode } from 'react';



/* ===================== PROPS ===================== */
interface UIContextType {
  activePage: string;
  sidebarOpen: boolean;
  profilePanel: boolean;
  notificationPanel: boolean;
  settingsPanel: boolean;
  servicePanel: boolean;

  toggleSidebar: () => void;
  toggleProfilePanel: () => void;
  toggleNotificationPanel: () => void;
  toggleSettingsPanel: () => void;
  toggleServicePanel: () => void;

  setSidebarOpen: (value: boolean) => void;
  setActivePage: (page: string) => void;
}



/* ===================== CONTEXT SETUP ===================== */
const UIContext = createContext<UIContextType | undefined>(undefined);



/* ===================== CONTEXT PROVIDER ===================== */
export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [activePage, setActivePage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profilePanel, setProfilePanel] = useState(false);
  const [notificationPanel, setNotificationPanel] = useState(false);
  const [settingsPanel, setSettingsPanel] = useState(false);
  const [servicePanel, setServicePanel] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleProfilePanel = () => setProfilePanel(prev => !prev);
  const toggleNotificationPanel = () => setNotificationPanel(prev => !prev);
  const toggleSettingsPanel = () => setSettingsPanel(prev => !prev);
  const toggleServicePanel = () => setServicePanel(prev => !prev);


  /* ====== Return ====== */
  return (
    <UIContext.Provider value={{
      activePage,
      sidebarOpen,
      profilePanel,
      notificationPanel,
      settingsPanel,
      servicePanel,
      toggleSidebar,
      toggleProfilePanel,
      toggleNotificationPanel,
      toggleSettingsPanel,
      toggleServicePanel,
      setSidebarOpen,
      setActivePage,
    }}>
      {children}
    </UIContext.Provider>
  );
};



/* ===================== CUSTOM HOOK ===================== */
export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within a UIProvider');
  return context;
};
