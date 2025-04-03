import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ authenticate }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar errores
  const navigate = useNavigate();
  const { username, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5002/api/auth/login", { username, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token); // Guardar token en localStorage
      authenticate(user); // Pasar datos del usuario a la autenticación
      navigate("/dashboard"); // Redirigir con useNavigate
    } catch (err) {
      console.error("❌ Error de autenticación:", err.response?.data || err.message);
      setErrorMessage(err.response?.data?.msg || "Error al iniciar sesión. Intenta nuevamente."); // Mostrar error
    }
  };

  return (
    <div className="conteiner1">
      <div className="imgFondo">
        <img src="/images/fondoSolo.png" alt="img_fondo" />
      </div>
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <img src="/images/logo.jpg" alt="logo" />
          <h1>POLICÍA NACIONAL DEL PERÚ</h1>
          <h3>ESTUDIO ESTRATÉGICO POLICIAL</h3>
          <h4>Suboficiales de Armas</h4>
          <input type="text" name="username" value={username} onChange={onChange} placeholder="USUARIO" required />
        </div>
        <div>
          <input type="password" name="password" value={password} onChange={onChange} placeholder="CONTRASEÑA" required />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>} {/* Mostrar mensaje de error */}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;