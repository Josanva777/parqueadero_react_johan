import Login from '../pages/Login';
import RutaProtegida from '../components/RutaProtegida.jsx';
import NotFound from '../pages/NotFound.jsx';
import Disponibilidad from '../pages/Disponibilidad.jsx';
import Entrada from '../pages/Entrada.jsx';
import Salida from '../pages/Salida.jsx';
import Mensualidad from '../pages/Mensualidad.jsx';
import Reporte from '../pages/Reportes.jsx';
import CreateAccount from '../pages/CreateAccount.jsx';
import EditarUsuario from '../pages/EditarUsuario.jsx';
import TipoVehiculo from '../pages/TipoVehiculo.jsx';
import RutaProtegidaAdmin from '../components/RutaProtegiaAdmin.jsx';
import Forbidden from '../pages/Forbidden.jsx';

export let routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/disponibilidad',
    element: <RutaProtegida protect={<Disponibilidad />} />,
  },
  {
    path: '/entrada',
    element: <RutaProtegida protect={<Entrada />} />,
  },
  {
    path: '/salida',
    element: <RutaProtegida protect={<Salida />} />,
  },
  {
    path: '/mensualidad',
    element: <RutaProtegida protect={<Mensualidad />} />,
  },
  {
    path: '/reporte',
    element: <RutaProtegidaAdmin protect={<Reporte />} />,
  },
  {
    path: '/formularioregistro',
    element: <RutaProtegidaAdmin protect={<CreateAccount />} />,
  },
  {
    path: '/editar-usuario/:id',
    element: <RutaProtegidaAdmin protect={<EditarUsuario />} />,
  },
  {
    path: '/tipo-vehiculos',
    element: <RutaProtegidaAdmin protect={<TipoVehiculo />} />,
  },
  {
    path: '/no-autorizado',
    element: <RutaProtegida protect={<Forbidden />} />,
  },
  {
    path: '*',
    element: <RutaProtegida protect={<NotFound />} />,
  },
];
