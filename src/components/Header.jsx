import "./Header.css";
import { FiLogOut } from "react-icons/fi";
import { BsSun, BsMoon } from "react-icons/bs";
import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { alertaCerrarSesion } from "../helpers/funciones.js";
import imagenes from "../assets/img/imagenes.js";

function Header() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <header className="header-container">
      <div className="header-content">
        <NavLink to="/disponibilidad" className="header-logo">
          <img
            src={imagenes.img3}
            alt="Logo parqueadero"
            className="header-logo-img"
          />
        </NavLink>
        <div className="header-actions">
          <button
            className="header-darkmode-toggle"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {isDarkMode ? (
              <BsSun className="header-darkmode-icon" />
            ) : (
              <BsMoon className="header-darkmode-icon" />
            )}
          </button>
          <button
            className="header-logout"
            onClick={() => alertaCerrarSesion(navigate)}
            aria-label="Cerrar sesión"
          >
            <FiLogOut className="header-logout-icon" />
            <span className="header-logout-text">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;