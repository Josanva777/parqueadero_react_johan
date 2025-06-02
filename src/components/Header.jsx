import "./Header.css";
import { FiLogOut } from "react-icons/fi";
import { BsSun, BsMoon } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { alertaCerrarSesion } from "../helpers/funciones";

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
        <div className="header-logo">
          <img
            src="/logo_parqueadero.png"
            alt="Logo parqueadero"
            className="header-logo-img"
          />
        </div>
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