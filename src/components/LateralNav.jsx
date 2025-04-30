import "./LateralNav.css";
import { FaRegCalendar } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function LateralNav() {
  const location = useLocation();
  const isRegistroRoute = location.pathname === "/formularioregistro";
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button className="hamburger-btn" onClick={toggleMenu}>
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <ul className="sidebar-menu">
            <li>
              <a href="#">
                <FaRegCalendar className="icon" />
                <span>Disponibilidad</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Entrada</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Salida</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Mensualidad</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Reserva</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Reportes</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Ayuda</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Politicas</span>
              </a>
            </li>
          </ul>
          <div className="sidebar-footer">
            {!isRegistroRoute && (
              <Link to="/formularioregistro" className="sidebar-footer-link">
                Crear cuenta
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default LateralNav;