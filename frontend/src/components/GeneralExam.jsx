import React from "react";
import { useNavigate } from "react-router-dom";
import "./GeneralExam.css";

const GeneralExam = ({ user }) => {
  const navigate = useNavigate();

  const handleStartExam = () => {
    navigate("/examen-general"); // Redirigir con useNavigate
  };

  return (
    <div className="general-exam">
      <div className="title_exam">
        <h1>POLICÍA NACIONAL DEL PERÚ</h1>
        <h2>Sistema de Evaluación del Conocimiento Policial - TIPO SIECOPOL</h2>
        <h3>Módulo de Examen Virtual</h3>
        <p>Simulador del proceso de ascenso de suboficiales de armas 2025 - Promoción 2026</p>
      </div>

      <div className="name_usuario">
        <p>Usuario: {user ? user.name : "Nombre de Usuario No Disponible"}</p>
      </div>

      <div className="instrucciones">
        <div className="instrucciones_contenido">
          <h4>Estimado(a) Usuario(a)</h4>
          <p>
            Usted se encuentra en el Módulo de Examen Virtual del Sistema de Evaluaciones de Conocimiento Policial (TIPO SIECOPOL),
            el cual ha sido desarrollado con la finalidad de generar un único examen a cada postulante a partir del Banco de Preguntas
            válidas seleccionadas para el presente proceso de evaluación, considerando su grado y especialidad.
          </p>
          <div className="advertencia">
            <h4>Advertencia</h4>
            <ul>
              <li>Todas las acciones que realice en este equipo de cómputo durante el examen están siendo monitoreadas.</li>
              <li>Ante cualquier manipulación indebida del teclado, el sistema finalizará automáticamente su examen.</li>
            </ul>
          </div>
          <h4>Instrucciones:</h4>
          <ul>
            <li>Seleccione la pregunta haciendo clic en su número dentro del tablero de la izquierda.</li>
            <li>Responda haciendo clic en la alternativa correcta.</li>
            <li>Puede cambiar la respuesta o borrar una contestación para corregirla más adelante.</li>
            <li>Puede finalizar el examen antes de que el tiempo se agote.</li>
            <li>No olvide firmar y recibir el acta de finalización con el Administrador del Examen Virtual.</li>
          </ul>
          <p>Atentamente,</p>
          <p>Dirección de Recursos Humanos de la Policía Nacional del Perú</p>
        </div>
        <div className="button_instrucciones">
          <button onClick={handleStartExam} className="btn_comenzar_examen">Generar Examen Virtual</button>
        </div>
      </div>
    </div>
  );
};

export default GeneralExam;