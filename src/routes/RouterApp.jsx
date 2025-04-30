import { Navigate } from "react-router-dom";
import FormularioRegistro from "../pages/FormularioRegistro";
import Login from "../pages/Login"; 

export let routes = [
  {
    path: '/',
    element: <Navigate to="/formularioregistro" replace />, 
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/formularioregistro',
    element: <FormularioRegistro />,
  },
];
