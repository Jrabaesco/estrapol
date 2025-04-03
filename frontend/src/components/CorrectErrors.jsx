import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CorrectErrors.css";

const CorrectErrors = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { incorrectQuestions = [] } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [highlightAnswers, setHighlightAnswers] = useState(false);
  const [timer, setTimer] = useState(0);
  const checkboxRef = useRef(null);

  useEffect(() => {
    if (incorrectQuestions.length > 0) {
      setQuestions(incorrectQuestions.map((question) => ({
        ...question,
        shuffledOptions: shuffleArray(question.options),
      })));
    }
  }, [incorrectQuestions]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (questionId, option, correct) => {
    setAnsweredQuestions((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter((aq) => aq.questionId !== questionId);
      return [...updatedAnswers, { questionId, option, correct }];
    });
  };

  const formatTime = (timer) => {
    const hours = String(Math.floor(timer / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timer % 3600) / 60)).padStart(2, "0");
    const seconds = String(timer % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleFinalize = () => {
    const correctAnswers = answeredQuestions.filter((aq) => aq.correct).length;
    const incorrectAnswers = answeredQuestions.length - correctAnswers;
    navigate("/results", { state: { correctAnswers, incorrectAnswers, totalQuestions: questions.length, timer } });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="correct-errors">
      <div className="title_exam">
        <h1>POLICÍA NACIONAL DEL PERÚ</h1>
        <h2>ESTUDIO ESTRATÉGICO POLICIAL</h2>
        <h3>CORRECCIÓN DE ERRORES</h3>
        <p>Simulador del proceso de ascenso de suboficiales de armas 2025 - Promoción 2026</p>
      </div>

      <div className="name_usuario">
        <p>Usuario: {user ? user.name : "Nombre de Usuario No Disponible"}</p>
      </div>

      <div className="contenedor_examen">
        {currentQuestion && (
          <div className="pregunta_completa">
            <div className="pregunta">
              <span>{currentQuestionIndex + 1}.</span>
              <label>{currentQuestion.question_text}</label>
            </div>

            <div className="todas_alternativas">
              {currentQuestion.shuffledOptions.map((option, idx) => (
                <div key={idx} className="alternativas">
                  <input
                    type="radio"
                    name={`question_${currentQuestion._id}`}
                    checked={answeredQuestions.some((aq) => aq.questionId === currentQuestion._id && aq.option === option)}
                    onChange={() => handleAnswer(currentQuestion._id, option, option === currentQuestion.correct_option)}
                  />
                  <span>{String.fromCharCode(65 + idx)}.</span>
                  <label>{option}</label>
                </div>
              ))}
            </div>

            <button className="finalizar" onClick={handleFinalize}>Finalizar Corrección</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CorrectErrors;