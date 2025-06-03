import Login from '../pages/Login';
import RutaProtegida from '../components/RutaProtegida.jsx';
import NotFound from '../pages/NotFound.jsx';
import TableExample from '../pages/TableExample.jsx';
// import MonthlyPayment from '../pages/MonthlyPayment.jsx';
import Blank from '../pages/Blank.jsx';
import Disponibilidad from '../pages/Disponibilidad.jsx';
import Entrada from '../pages/Entrada.jsx';
import Salida from '../pages/Salida.jsx';
import Mensualidad from '../pages/Mensualidad.jsx';
import Reserva from '../pages/Reserva.jsx';
import Reporte from '../pages/Reportes.jsx';
import Ayuda from '../pages/Ayuda.jsx';
import Politicas from '../pages/Politicas.jsx';
import CreateAccount from '../pages/CreateAccount.jsx';
import EditarUsuario from '../pages/EditarUsuario.jsx';

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
    path: '/reserva',
    element: <RutaProtegida protect={<Reserva />} />,
  },
  {
    path: '/reporte',
    element: <RutaProtegida protect={<Reporte />} />,
  },
  {
    path: '/ayuda',
    element: <RutaProtegida protect={<Ayuda />} />,
  },
  {
    path: '/politicas',
    element: <RutaProtegida protect={<Politicas />} />,
  },
  {
    path: '/formularioregistro',
    element: <RutaProtegida protect={<CreateAccount />} />,
  },
  {
    path: '/tablas',
    element: <RutaProtegida protect={<TableExample />} />,
  },
  {
    path: '/editar-usuario/:id',
    element: <RutaProtegida protect={<EditarUsuario />} />,
  },
  {
    path: '/blank',
    element: <Blank />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
