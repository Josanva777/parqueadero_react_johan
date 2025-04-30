import { useState } from "react";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "../components/Header";
import LateralNav from "../components/LateralNav";
import "./FormularioRegistro.css";

function FormularioRegistro() {
  const [formData, setFormData] = useState({
    tipoDocumento: "",
    documento: "",
    nombre: "",
    apellido: "",
    sexo: "",
    telefono: "",
    correo: "",
    rol: "",
    usuario: "",
    contrasena: "",
    confirmar: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.contrasena !== formData.confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Formulario enviado:", formData);
  };

  return (
    <div className="page-container">
      <Header />
      <div className="main-container">
        <LateralNav />
        <main className="content-container">
          <div className="form-wrapper">
            <h1 className="form-title">
              <FaUser className="form-icon" /> Registro de Usuarios
            </h1>
            <form id="formularioRegistro" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-column">
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ingresa tu nombre"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Apellidos</label>
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      placeholder="Ingresa tus apellidos"
                      required
                    />
                  </div>
                  <div className="form-group radio-group">
                    <label>Sexo</label>
                    <div className="radio-options">
                      {["Hombre", "Mujer", "Binario"].map((option) => (
                        <label key={option} className="radio-label">
                          <input
                            type="radio"
                            name="sexo"
                            value={option}
                            checked={formData.sexo === option}
                            onChange={handleChange}
                            required={option === "Hombre"}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="Ingresa tu teléfono"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      placeholder="ejemplo@correo.com"
                    />
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label>Tipo Documento</label>
                    <select
                      name="tipoDocumento"
                      value={formData.tipoDocumento}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccionar</option>
                      <option value="cc">Cédula de ciudadanía</option>
                      <option value="ti">Tarjeta de identidad</option>
                      <option value="ce">Cédula de extranjería</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>No° Documento</label>
                    <input
                      type="number"
                      name="documento"
                      value={formData.documento}
                      onChange={handleChange}
                      placeholder="Número de documento"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Rol</label>
                    <select
                      name="rol"
                      value={formData.rol}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccionar</option>
                      <option value="admin">Administrativa</option>
                      <option value="operario">Operario</option>
                      <option value="usuario">Cliente</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Usuario</label>
                    <input
                      type="text"
                      name="usuario"
                      value={formData.usuario}
                      onChange={handleChange}
                      placeholder="Nombre de usuario"
                    />
                  </div>
                  <div className="form-group password-group">
                    <label>Contraseña</label>
                    <div className="password-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
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
                        name="confirmar"
                        value={formData.confirmar}
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
              </div>
              <div className="form-button">
                <button type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FormularioRegistro;