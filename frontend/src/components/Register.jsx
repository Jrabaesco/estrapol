import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "", name: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { username, password, name } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5002/api/auth/register", formData);
      localStorage.setItem("token", res.data.token); // Guardar token en localStorage
      alert("✅ Usuario registrado exitosamente!");
      navigate("/login"); // Redirigir al login
    } catch (err) {
      console.error("❌ Error en el registro:", err.response?.data || err.message);
      setErrorMessage(err.response?.data?.msg || "Error al registrar usuario. Intenta nuevamente.");
    }
  };

  return (
    <div className="registro-usuario">
      <div className="imgFondo">
        <img src="/images/fondoSolo.png" alt="img_fondo" />
      </div>
      <form onSubmit={onSubmit}>
        <img src="/images/logo.jpg" alt="logo" />
        <h4>REGISTRO DE USUARIOS "ESTRAPOL"</h4>
        <div>
          <input type="email" name="username" placeholder="CORREO CORPORATIVO" value={username} onChange={onChange} required />
        </div>
        <div>
          <input type="password" name="password" placeholder="CONTRASEÑA (mínimo 6 caracteres)" value={password} onChange={onChange} required />
        </div>
        <div>
          <input type="text" name="name" placeholder="GRADO, NOMBRES Y APELLIDOS" value={name} onChange={onChange} required />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;