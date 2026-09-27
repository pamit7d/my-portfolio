import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/main.css'
import App from './App.jsx'
import LampScene from './pages/Lamp.jsx'
import Games from './pages/Games'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/lamp" element={<LampScene />} />
        <Route path="/bulb" element={<LampScene />} />
        <Route path="/games" element={<Games />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
