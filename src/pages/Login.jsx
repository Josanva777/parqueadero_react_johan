import { useState } from 'react';
import { alertNotification } from '../helpers/funciones.js';
import { useNavigate } from 'react-router-dom';
import imagenes from '../assets/img/imagenes.js';
import '../pages/Login.css';
const apiLogin = 'https://backend-parqueadero-j8gj.onrender.com/api/auth/login';

function Login() {
  let redirection = useNavigate();
  const [getUser, setUser] = useState('');
  const [getPassword, setPassword] = useState('');

  function login(e) {
    e.preventDefault();

    fetch(apiLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: getUser,
        password: getPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          alertNotification('Error!', data.message, 'error');
          return
        }

        guardarLocalStorge(data)
      })
  }

  function guardarLocalStorge(data) {
    localStorage.setItem("token", JSON.stringify(data.result));
    localStorage.setItem("user", JSON.stringify(getUser));
    alertNotification('¡Exitoso!', 'Bienvenido al sistema', 'success');
    redirection('/formularioregistro');
  }

  return (
    <section className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <figure className="h-32 md:h-auto md:w-1/2 colorlogo">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full"
              src={imagenes.img4}
              alt="Office"
            />
          </figure>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form onSubmit={login} className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Inicio de Sesión
              </h1>
              <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">Usuario</span>
                <input
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  onChange={e => setUser(e.target.value)}
                />
              </label>
              <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">Contraseña</span>
                <input
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                />
              </label>
              <input
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                href="../index.html"
                type="submit"
                value="Entrar"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
