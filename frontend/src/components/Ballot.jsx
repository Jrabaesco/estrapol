import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Ballot.css";

const Ballot = ({ user }) => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get("http://localhost:5002/api/topics/all");
        setTopics(res.data);
      } catch (error) {
        console.error("❌ Error al obtener los temas:", error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="conteiner">
      <div className="imgFondo">
        <img src="/images/fondoSolo.png" alt="Fondo decorativo" />
      </div>
      <div className="ballot">
        <h1>{user?.name || "Usuario"}</h1>
        <p>¿Qué balotario didáctico deseas practicar?</p>
        <div className="topics">
          {topics.map((topic) => (
            <button 
              key={topic._id} 
              className="topic"
              onClick={() => navigate(`/topic/${topic._id}`)}
            >
              <img src="/images/logo_transparente.png" alt={`Balotario ${topic.short_name}`} />
              {topic.short_name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ballot;