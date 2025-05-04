import Login from '../pages/Login'; 
import RutaProtegida from '../components/RutaProtegida.jsx';
import NotFound from "../pages/NotFound.jsx";
import CreateAccount from "../pages/createAccount.jsx";

export let routes = [
  {
    path: '/',
    element: <Login /> 
  },
  {
    path: '/formularioregistro',
    element: <RutaProtegida protect={<CreateAccount/>} />
  },
  {
    path: '*',
    element: <NotFound />
  }
];
