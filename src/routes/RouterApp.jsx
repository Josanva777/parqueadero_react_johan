import Login from '../pages/Login';
import RutaProtegida from '../components/RutaProtegida.jsx';
import NotFound from '../pages/NotFound.jsx';
import CreateAccount from '../pages/CreateAccount.jsx';
import TableExample from '../pages/TableExample.jsx';
import Entrada from '../pages/Entrada.jsx';
import MonthlyPayment from '../pages/MonthlyPayment.jsx';

export let routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/formularioregistro',
    element: <RutaProtegida protect={<CreateAccount />} />,
  },
  {
    path: '/tablas',
    element: (
      <TableExample
        props={{
          header: ['Nombre', 'Apellido', 'Edad', 'Email'],
          body: { nombre: 'Juan', apellido: 'Pérez', edad: 30, email: 'correo@correo.com' },
        }}
      />
    ),
  },
  {
    path: '/Entrada',
    element: <Entrada />,
  },
  {
    path: '/mensualidad',
    element: <MonthlyPayment />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];