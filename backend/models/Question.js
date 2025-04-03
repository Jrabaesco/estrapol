const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  topic_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  question_text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct_option: { type: Number, required: true }, // Cambiado a número para facilitar validaciones
  tips: { type: String, trim: true }
}, { timestamps: true }); // Agrega marcas de tiempo de creación y actualización

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;