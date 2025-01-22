import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ColorModeProvider } from './contexts/ColorModeContext'
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ColorModeProvider>
          <Toaster position="top-right" />
          <App />
        </ColorModeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)