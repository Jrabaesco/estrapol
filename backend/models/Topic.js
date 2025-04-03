const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  short_name: { type: String, required: true, unique: true, trim: true }
}, { timestamps: true });

const Topic = mongoose.model('Topic', TopicSchema);
module.exports = Topic;