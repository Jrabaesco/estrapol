import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ExamenGeneral.css";

const ExamenGeneral = ({ user }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [highlightAnswers, setHighlightAnswers] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60);
  const [questionsPerTopic, setQuestionsPerTopic] = useState({});
  const checkboxRef = useRef(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5002/api/exam/general");
        setQuestions(res.data.questions);
        setQuestionsPerTopic(res.data.topicDistribution);
      } catch (error) {
        console.error("❌ Error al obtener las preguntas:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleFinalize = useCallback(() => {
    const correctAnswers = answeredQuestions.filter((aq) => aq.correct).length;
    const totalQuestions = questions.length;
    const timeSpent = 2 * 60 * 60 - timeLeft;

    navigate("/results", {
      state: { correctAnswers, incorrectAnswers: totalQuestions - correctAnswers, totalQuestions, timer: timeSpent, questions, answeredQuestions },
    });
  }, [answeredQuestions, navigate, questions, timeLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          handleFinalize();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [handleFinalize]);

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

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="examen-general">
      <div className="title_exam">
        <h1>POLICÍA NACIONAL DEL PERÚ</h1>
        <h2>Sistema de Evaluación del Conocimiento Policial - SIECOPOL</h2>
        <h3>Módulo de Examen Virtual</h3>
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
              {currentQuestion.options.map((option, idx) => (
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

            <button className="finalizar" onClick={handleFinalize}>Finalizar Examen</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamenGeneral;