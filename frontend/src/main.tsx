import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ServiceRequestProvider } from '@hooks/useServiceRequest.tsx';
import { ThemeProvider } from '@hooks/useTheme.tsx';
import { UserProvider } from '@hooks/useUser.tsx';
import { UIProvider } from '@hooks/useUI.tsx';
import App from './App.tsx';
import './index.css';



createRoot(document.getElementById('root')!).render(
  //<StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <UIProvider>
          <ServiceRequestProvider>
            <App />
          </ServiceRequestProvider>
          </UIProvider>
        </UserProvider>  
      </ThemeProvider>
    </BrowserRouter>
  //</StrictMode>
)
