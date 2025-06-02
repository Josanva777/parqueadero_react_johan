import "./LateralNav.css";
import { FaRegCalendar } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function LateralNav() {
  const location = useLocation();
  const isRegistroRoute = location.pathname === "/formularioregistro";
  const isEntradaRoute = location.pathname === "/Entrada";
  const redirection = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-purple-600 font-bold sidebar-link active"
      : "text-gray-700 sidebar-link";


  return (
    <>
      <button
        className="hamburger-btn"
        onClick={toggleMenu}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/disponibilidad">
                <FaRegCalendar className="icon" />
                <span>Disponibilidad</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/entrada" className={navLinkClass}>
                <span>Entrada</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/salida" className={navLinkClass}>
                <span>Salida</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/mensualidad" className={navLinkClass}>
                <span>Mensualidad</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reserva" className={navLinkClass}>
                <span>Reserva</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reporte" className={navLinkClass}>
                <span>Reporte</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/ayuda" className={navLinkClass}>
                <span>Ayuda</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/politicas" className={navLinkClass}>
                <span>Politicas</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/tablas" className={navLinkClass}>
                <span>Tablas</span>
              </NavLink>
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