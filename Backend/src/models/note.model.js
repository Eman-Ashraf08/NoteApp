const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  image: { type: String, default: null },
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
