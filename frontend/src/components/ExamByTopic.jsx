import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ExamByTopic.css";

const ExamByTopic = ({ user }) => {
  const { topicId, questionCount } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [timer, setTimer] = useState(0);
  const [highlightAnswers, setHighlightAnswers] = useState(false);
  const [topicName, setTopicName] = useState("");
  const checkboxRef = useRef(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:5002/api/topics/${topicId}`);
        const shuffledQuestions = shuffleArray(res.data.questions);
        setQuestions(
          shuffledQuestions.slice(0, questionCount).map((question) => ({
            ...question,
            shuffledOptions: shuffleArray(question.options),
          }))
        );
        setTopicName(res.data.topic.name);
      } catch (error) {
        console.error("❌ Error al obtener las preguntas:", error);
      }
    };

    if (topicId && questionCount) {
      fetchQuestions();
    }
  }, [topicId, questionCount]);

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

  const handleFinalize = async () => {
    const correctAnswers = answeredQuestions.filter((aq) => aq.correct).length;
    const totalQuestions = questions.length;

    try {
      await axios.post("http://localhost:5002/api/historial", {
        userId: user._id,
        examType: "tema",
        topicId: topicId,
        correctAnswers,
        totalQuestions,
        timeSpent: timer,
      });
    } catch (error) {
      console.error("❌ Error al guardar el historial:", error);
    }

    navigate("/results", { state: { correctAnswers, incorrectAnswers: totalQuestions - correctAnswers, totalQuestions, timer } });
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnsweredQuestions([]);
    setTimer(0);
    setQuestions(questions.map((question) => ({
      ...question,
      shuffledOptions: shuffleArray(question.options),
    })));
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="exam-by-topic">
      <div className="title_exam">
        <h1>POLICÍA NACIONAL DEL PERÚ</h1>
        <h2>ESTUDIO ESTRATÉGICO POLICIAL</h2>
        <h3>Módulo de Examen por Temas</h3>
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

            <button className="finalizar" onClick={handleFinalize}>Finalizar Examen</button>
            <button className="reiniciar" onClick={handleRestart}>Reiniciar Examen</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamByTopic;