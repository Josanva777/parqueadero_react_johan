<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Login'
import CreateAccount from './CreateAccount'
=======
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes/RouterApp';
import "./assets/css/tailwind.output.css";
>>>>>>> a4d7a4a1ae784f4f1092acec7f3dfc4cfe620481


// Creación del router con las rutas definidas
const router = createBrowserRouter(routes);

// Seleccionar el elemento root donde se monta la aplicación
const rootElement = document.getElementById('root');

// Validar si el elemento root existe y montar la aplicación
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
} else {
  console.error("No se encontró el elemento con id 'root'.");
}