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

  const redirectMonthlyPayment = () => {
    redirection("/mensualidad");
  };

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
              <NavLink to="/Entrada" activeClassName="active">
                <span>Entrada</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/salida">
                <span>Salida</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/mensualidad">
                <span>Mensualidad</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reserva">
                <span>Reserva</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reporte">
                <span>Reporte</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/ayuda">
                <span>Ayuda</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/politicas">
                <span>Politicas</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/tablas">
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