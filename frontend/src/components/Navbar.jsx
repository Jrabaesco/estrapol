import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prevState) => !prevState);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar token de autenticación
    closeMenu();
    logout();
    navigate("/login"); // Redirigir con useNavigate
  };

  return (
    <div className="container_navbar">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/dashboard">
            <img src="favicon.ico" alt="Logo de Estrapol" />
          </Link>
        </div>
        <button className="menu-button" onClick={toggleMenu}>
          <img src="/images/menu-icon.png" alt="Menú desplegable" />
        </button>
        <ul className={`navbar-menu ${isOpen ? "open" : ""}`}>
          <li><Link to="/dashboard" onClick={closeMenu}>Inicio</Link></li>
          <li><Link to="/ballot" onClick={closeMenu}>Balotario Didáctico</Link></li>
          <li><Link to="/exam-generator" onClick={closeMenu}>Examen por Temas</Link></li>
          <li><Link to="/general-exam" onClick={closeMenu}>Examen General</Link></li>
          <li><button onClick={handleLogout}>Salir</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;