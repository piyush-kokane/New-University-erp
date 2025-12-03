import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
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
          	<App />
					</UIProvider>
      	</UserProvider>  
			</ThemeProvider>
    </BrowserRouter>
  //</StrictMode>
)
