import { Navigate } from "react-router-dom";
import FormularioRegistro from '../pages/FormularioRegistro';
import Login from '../pages/Login'; 
import RutaProtegida from '../components/RutaProtegida.jsx';

export let routes = [
  {
    path: '/',
    element: <Login /> 
  },
  {
    path: '/formularioregistro',
    element: <RutaProtegida protect={<FormularioRegistro/>} />
  }
];
