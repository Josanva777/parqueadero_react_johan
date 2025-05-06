import { useEffect, useState } from 'react';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../components/Header';
import LateralNav from '../components/LateralNav';
import './CreateAccount.css';
import { alertNotification } from '../helpers/funciones';
import Table from '../components/Table';
const apiUsers = 'http://localhost:3000/users';

function CreateAccount() {
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
    fetch(apiUsers)
      .then(response => response.json())
      .then(result => setUsers(result));
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
      id: users.length + 1,
      rol: parseInt(formData.rol),
      user: formData.user,
      email: formData.email.toLowerCase(),
      password: formData.password,
    }

    const emailEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (formData.rol && formData.user && formData.password && formData.email) {
      if (emailEx.test(formData.email)) {
        let existUser = users.find(item => formData.user === item.user);
        if (!existUser) {
          let existEmail = users.find(item => formData.email === item.email);
          if (!existEmail) {
            if (formData.password === formData.confirm) {
              fetch(apiUsers, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
              }).then(() => {
                alertNotification('¡Exitoso!', 'Usuario creado correctamente', 'success');
                getUsers();
              });
              setFormData({ rol: '', user: '', password: '', email: '', confirm: '' });
            } else {
              alertNotification('Error', 'Las contraseñas no coinciden', 'error');
            }
          } else {
            alertNotification('¡Error!', 'Email ya existe', 'error');
          }
        } else {
          alertNotification('¡Error!', 'Usario ya existe', 'error');
        }
      } else {
        alertNotification('¡Error!', 'Email incorrecto', 'error');
      }
    } else {
      alertNotification('¡Error!', 'Llene todos los campos', 'error')
    }
  };

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
                    <option value="1">Administrador</option>
                    <option value="2">Operario</option>
                    <option value="3">Cliente</option>
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
                      required
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
          </div>
        </main>
      </div>
    </section>
  );
}

export default CreateAccount;