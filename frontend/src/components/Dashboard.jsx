import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({ user }) => {
  // Si el usuario no está autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="conteiner">
      <div className="imgFondo">
        <img src="/images/fondoSolo.png" alt="Fondo" />
      </div>
      <div className="dashboard">
        <h1>Bienvenido! <br /> {user.name ? user.name : "Usuario"} {user.surname ? user.surname : ""}</h1>
        <div className="options">
          <Link to="/ballot" className="option">
            <img src="/images/logo_transparente.png" alt="Balotario Didáctico" /> Balotario Didáctico
          </Link>
          <Link to="/exam-generator" className="option">
            <img src="/images/logo_transparente.png" alt="Examen por Temas" /> Examen por Temas
          </Link>
          <Link to="/general-exam" className="option">
            <img src="/images/logo_transparente.png" alt="Examen SIECOPOL" /> Examen SIECOPOL
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;