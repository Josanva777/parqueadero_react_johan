const apiUsers = 'http://localhost:8081/api/users';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { alertNotification } from '../helpers/funciones';
import React, { useEffect, useState } from 'react';
import LateralNav from '../components/LateralNav';
import Header from '../components/Header';
import { IoArrowBackCircleSharp } from 'react-icons/io5';

function EditarUsuario() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [formUser, setFormUser] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRol, setFormRol] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formConfirm, setFormConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  let token = JSON.parse(localStorage.getItem('token'));

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

  function getUser() {
    fetch(`${apiUsers}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        setFormUser(result.result.userName);
        setFormEmail(result.result.email);
        setFormRol(result.result.role);
        setUser(result.result)
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    getUser();
    getUsers();
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    if (!formUser || !formEmail || !formRol || !formPassword || !formConfirm) {
      alertNotification('¡Error!', 'Llene todos los campos', 'error');
      return;
    }

    const emailEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailEx.test(formEmail)) {
      alertNotification('¡Error!', 'Email incorrecto', 'error');
      return;
    }

    let existUser = users.find(item => {
      if (item.id != id) {
        return formUser === item.userName
      }
    });
    if (existUser) {
      alertNotification('¡Error!', 'Usario ya existe', 'error');
      return;
    }

    let existEmail = users.find(item => {
      if (item.id != id) {
        return formEmail === item.email
      }
    });
    if (existEmail) {
      alertNotification('¡Error!', 'Email ya existe', 'error');
      return;
    }

    const passwordEx = /^.{6,}$/
    if (!passwordEx.test(formPassword)) {
      alertNotification('¡Error!', 'La contraseña debe de contener al menos 6 caracteres', 'error');
      return;
    }
    if (formPassword !== formConfirm) {
      alertNotification('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    let userActualizado = {
      "email": formEmail,
      "userName": formUser,
      "role": formRol,
      "password": formPassword,
      "id": user.id
    }

    fetch(`${apiUsers}/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userActualizado)
    })
      .then(response => response.json())
      .then(result => {
        alertNotification('Éxito', result.message, 'success');
        navigate('/formularioregistro')
      })
      .catch(error => console.error(error));

  }

  return (
    <section className="page-container">
      <Header />
      <div className="main-container">
        <LateralNav />
        <main className="content-container">
          <div className="form-wrapper">
            <Link to={"/formularioregistro"}>
              <IoArrowBackCircleSharp className="back-icon" />
            </Link>
            <h1 className="form-title">
              <FaUser className="form-icon" />
              Editar Usuarios
            </h1>
            <form id="formularioRegistro" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Usuario</label>
                  <input
                    type="text"
                    name="user"
                    value={formUser}
                    onChange={e => setFormUser(e.target.value)}
                    placeholder="Nombre de usuario"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <label>Rol</label>
                  <select
                    name="rol"
                    value={formRol}
                    onChange={e => setFormRol(e.target.value)}
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
                      value={formPassword}
                      onChange={e => setFormPassword(e.target.value)}
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
                      value={formConfirm}
                      onChange={e => setFormConfirm(e.target.value)}
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
                <button type="submit">Editar</button>
              </div>
            </form>
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs mt-8">
              <div className="w-full overflow-x-auto">
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}

export default EditarUsuario