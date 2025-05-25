import { useEffect, useState } from 'react';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../components/Header';
import LateralNav from '../components/LateralNav';
import './CreateAccount.css';
import { alertNotification } from '../helpers/funciones';
import Table from "../components/Table";
const apiUsers = 'http://localhost:3000/users';

function CreateAccount() {
  let header = ['nombre', 'apellido', 'edad', 'email', 'hola'];
  let body = [{nombre:'Juan', apellido:'Pérez', edad:30, email:'correo@correo.com'}]

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
    const emailEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      rol: parseInt(formData.rol),
      user: formData.user,
      email: formData.email.toLowerCase(),
      password: formData.password,
    }

    if (!formData.user || !formData.confirm || !formData.email || !formData.password || !formData.rol ) {
      alertNotification('¡Error!', 'Llene todos los campos', 'error');
      return;
    }

    if (!emailEx.test(formData.email)) {
      alertNotification('¡Error!', 'Email incorrecto', 'error');
      return;
    }

    let existUser = users.find(item => formData.user === item.user);
    if (existUser) {
      alertNotification('¡Error!', 'Usario ya existe', 'error');
      return;
    }

    let existEmail = users.find(item => formData.email === item.email);
    if (existEmail) {
      alertNotification('¡Error!', 'Email ya existe', 'error');
      return;
    }

    if (formData.password !== formData.confirm) {
      alertNotification('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

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
            <Table props={{header:header, body:users}} />
          </div>
        </main>
      </div>
    </section>
  );
}

export default CreateAccount;