const express = require('express');
const Topic = require('../models/Topic');
const Question = require('../models/Question');

const router = express.Router();

// Crear un nuevo tema
router.post('/create', async (req, res) => {
  const { name, short_name } = req.body;
  try {
    const topic = new Topic({ name, short_name });
    await topic.save();
    res.status(201).json({ msg: '✅ Tema creado exitosamente', topic });
  } catch (err) {
    console.error('❌ Error al crear tema:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener todos los temas
router.get('/all', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (err) {
    console.error('❌ Error al obtener temas:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener un tema específico con preguntas asociadas
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ msg: '❌ Tema no encontrado' });
    }

    const questions = await Question.find({ topic_id: req.params.id });
    res.status(200).json({ topic, questions });
  } catch (err) {
    console.error('❌ Error al obtener tema:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener preguntas por tema
router.get('/:id/questions', async (req, res) => {
  try {
    const questions = await Question.find({ topic_id: req.params.id });
    if (questions.length === 0) {
      return res.status(404).json({ msg: '❌ Preguntas no encontradas' });
    }
    res.status(200).json(questions);
  } catch (err) {
    console.error('❌ Error al obtener preguntas:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;