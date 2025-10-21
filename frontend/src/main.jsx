import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContentProvider } from './content/AppContent.jsx'
import { AuthProvider } from './AuthContext.jsx'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContentProvider>
      <AuthProvider>
          <App />
      </AuthProvider>
    </AppContentProvider>
  </BrowserRouter>
    
)
