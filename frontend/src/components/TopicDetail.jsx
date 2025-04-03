import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./TopicDetail.css";

const TopicDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [timer, setTimer] = useState(0);
  const checkboxRef = useRef(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await axios.get(`http://localhost:5002/api/topics/${id}`);
        setTopic(res.data.topic);
        setQuestions(
          res.data.questions.map((question) => ({
            ...question,
            shuffledOptions: question.options.sort(() => Math.random() - 0.5),
          }))
        );
      } catch (error) {
        console.error("❌ Error al obtener los datos del tema:", error);
      }
    };

    fetchTopic();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => setTimer((prevTimer) => prevTimer + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (questionId, option, correct) => {
    setAnsweredQuestions((prev) => {
      const updatedAnswers = prev.filter((aq) => aq.questionId !== questionId);
      return [...updatedAnswers, { questionId, option, correct }];
    });
  };

  const handleFinalize = () => {
    const correctAnswers = answeredQuestions.filter((aq) => aq.correct).length;
    const totalQuestions = questions.length;
    
    navigate("/results", { 
      state: { correctAnswers, incorrectAnswers: totalQuestions - correctAnswers, totalQuestions, timer, questions, answeredQuestions } 
    });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="topic-detail">
      <div className="title_exam">
        <h1>POLICÍA NACIONAL DEL PERÚ</h1>
        <h2>Estudio Estratégico Policial</h2>
        <h3>Balotario Didáctico</h3>
        <p>Simulador del proceso de ascenso de suboficiales de armas 2025 - Promoción 2026</p>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicDetail;