// const apiLogin = 'https://backend-parqueadero-j8gj.onrender.com/api/auth/login';
const apiLogin = 'http://localhost:8081/api/auth/login';
import { alertNotification } from '../helpers/funciones.js';
import imagenes from '../assets/img/imagenes.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../pages/Login.css';

function Login() {
  let redirection = useNavigate();
  const [getUser, setUser] = useState('');
  const [getPassword, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function login(e) {
    e.preventDefault();
    setLoading(true);
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
          setLoading(false)
          alertNotification('Error!', data.message, 'error');
          return
        }

        guardarLocalStorge(data)
      })
      .catch(error => console.error('Error: ' + error))
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
          <figure className="w-full md:w-1/2 h-48 md:h-auto colorlogo">
            <img
              aria-hidden="true"
              className="w-full h-full object-cover"
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



              {/* <input
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                href="../index.html"
                type="submit"
                value="Entrar"
              /> */}
              {
                <button
                  className={`flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Iniciando sesión" : "Entrar"}
                  {loading && (
                    <div className="ml-2">
                      <span className="loader-login"></span>
                    </div>
                  )}
                </button>
              }
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
