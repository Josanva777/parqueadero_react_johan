import { useEffect, useState } from 'react';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../components/Header';
import LateralNav from '../components/LateralNav';
import './CreateAccount.css';
import { alertNotification, alertaConfirmar } from '../helpers/funciones';
import { Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
const apiUsers = 'https://backend-parqueadero-j8gj.onrender.com/api/users';

function CreateAccount() {
  let header = ['ID', 'USUARIO', 'EMAIL', 'ROL', 'ACCIONES'];
  let token = JSON.parse(localStorage.getItem('token'))

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    rol: '',
    user: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function getUsers() {
    fetch(apiUsers, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => setUsers(result.result))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getUsers();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newUser = {
      email: formData.email.toLowerCase(),
      userName: formData.user,
      password: formData.password,
      role: formData.rol
    }

    if (!formData.user || !formData.confirm || !formData.email || !formData.password || !formData.rol) {
      alertNotification('¡Error!', 'Llene todos los campos', 'error');
      return;
    }

    const emailEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailEx.test(formData.email)) {
      alertNotification('¡Error!', 'Email incorrecto', 'error');
      return;
    }

    let existUser = users.find(item => formData.user === item.userName);
    if (existUser) {
      alertNotification('¡Error!', 'Usario ya existe', 'error');
      return;
    }

    let existEmail = users.find(item => formData.email === item.email);
    if (existEmail) {
      alertNotification('¡Error!', 'Email ya existe', 'error');
      return;
    }

    const passwordEx = /^.{6,}$/
    if (!passwordEx.test(formData.password)) {
      alertNotification('¡Error!', 'La contraseña debe de contener al menos 6 caracteres', 'error');
      return;
    }

    if (formData.password !== formData.confirm) {
      alertNotification('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    fetch(apiUsers, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.accessToken}`
      },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(data => {
        setFormData({ rol: '', user: '', password: '', email: '', confirm: '' });

        alertNotification('Éxito', data.message, 'success');

        getUsers();
      })
  }


  function eliminarUsuario(id) {
    alertaConfirmar(id, getUsers, apiUsers)
  }

  return (
    <section className="page-container">
      <Header />
      <div className="main-container">
        <LateralNav />
        <main className="content-container">
          <div className="form-wrapper">
            <h1 className="form-title">
              <FaUser className="form-icon" />
              Registro de Usuarios
            </h1>
            <form id="formularioRegistro" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Usuario</label>
                  <input
                    type="text"
                    name="user"
                    value={formData.user}
                    onChange={handleChange}
                    placeholder="Nombre de usuario"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <label>Rol</label>
                  <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Operario">Operario</option>
                  </select>
                </div>
                <div className="form-group password-group">
                  <label>Contraseña</label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="form-group password-group">
                  <label>Confirmar Contraseña</label>
                  <div className="password-wrapper">
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirm"
                      value={formData.confirm}
                      onChange={handleChange}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-button">
                <button type="submit">Guardar</button>
              </div>
            </form>
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs mt-8">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      {header.map((element, index) => {
                        return (
                          <th className="px-4 py-3" key={index}>
                            {element}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    {
                      !users.length ? (
                        <tr>
                          <td colSpan="5">
                            <div className="flex justify-center items-center py-6">
                              <span className="loader"></span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        users.map((row) => (
                          <tr className="text-gray-700 dark:text-gray-400" key={row.id}>
                            <th className="px-4 py-3">{row.id}</th>
                            <th className="px-4 py-3">{row.userName}</th>
                            <th className="px-4 py-3">{row.email}</th>
                            <th className="px-4 py-3">{row.role}</th>
                            <th className="px-4 py-3">
                              <div className="flex p-4 justify-center">
                                <Link to={"/editar-usuario/" + row.id} className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none mr-2">
                                  <Edit className="w-5 h-5" />
                                </Link>
                                <button onClick={() => eliminarUsuario(row.id)} className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </th>
                          </tr>
                        ))
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default CreateAccount;