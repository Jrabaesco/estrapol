const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const topicRoutes = require("./routes/topics");

require("dotenv").config();

const app = express();

// Conectar a la base de datos
connectDB()
  .then(() => console.log("✅ MongoDB conectado correctamente"))
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1); // Detener el servidor si la conexión falla
  });

// Middleware
app.use(express.json());
app.use(cors());

// Rutas con manejo de errores
try {
  app.use("/api/auth", authRoutes);
  app.use("/api/topics", topicRoutes);
} catch (error) {
  console.error("❌ Error al cargar las rutas:", error);
}

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("❌ Error interno:", err);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Configuración del puerto desde .env
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en el puerto ${PORT}`));