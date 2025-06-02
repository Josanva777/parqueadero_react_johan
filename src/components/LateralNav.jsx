import "./LateralNav.css";
import { MdOutlineEventAvailable } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdExit } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { LuDoorOpen } from "react-icons/lu";
import { RiCalendarTodoLine } from "react-icons/ri";
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
                <RiCalendarTodoLine className="iconDisponibilidad" />
                <span>Disponibilidad</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/entrada" className={navLinkClass}>
                <LuDoorOpen className="iconEntrada" />
                <span>Entrada</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/salida" className={navLinkClass}>
                <IoMdExit className="iconExit" />
                <span>Salida</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/mensualidad" className={navLinkClass}>
                <MdOutlineCalendarMonth className="iconMensualidad" />
                <span>Mensualidad</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reserva" className={navLinkClass}>
              <MdOutlineEventAvailable className="iconReserva" />
                <span>Reserva</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reporte" className={navLinkClass}>
                <HiOutlineDocumentReport className="iconReporte" />
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