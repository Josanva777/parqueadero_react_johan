import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Login'
import CreateAccount from './CreateAccount'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login/>
  </StrictMode>,
)
