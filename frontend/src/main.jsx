import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css'; // Asegúrate de que esta ruta sea correcta

// Obtener el elemento root del DOM
const container = document.getElementById('root');

// Crear una raíz React
const root = createRoot(container);

// Renderizar la aplicación
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);