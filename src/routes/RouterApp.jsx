import { Navigate } from "react-router-dom";
import FormularioRegistro from '../pages/FormularioRegistro';
import Login from '../pages/Login'; 
import RutaProtegida from '../components/RutaProtegida.jsx';
import NotFound from "../pages/NotFound.jsx";
import TableExample from "../pages/TableExample.jsx";

export let routes = [
  {
    path: '/',
    element: <Login /> 
  },
  {
    path: '/formularioregistro',
    element: <RutaProtegida protect={<FormularioRegistro/>} />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/tablas',
    element: <TableExample props={{
      header: ['Nombre', 'Apellido', 'Edad', 'Email'],
      body: {nombre:'Juan', apellido:'Pérez', edad:30, email:'correo@correo.com'}
      
    }
    } />
  }
];
