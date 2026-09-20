import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../css/styles.css'
import App from './App.jsx'
import { InteractionSoundsProvider } from './InteractionSounds'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InteractionSoundsProvider><App /></InteractionSoundsProvider>
  </StrictMode>,
)
