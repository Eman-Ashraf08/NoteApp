"use strict";

const express = require("express");
const router = express.Router();
const NoteManager = require("../manager/noteManager");
const { httpsCodes } = require("../constants/httpsCodes");
const { upload } = require("../helper/helper");

// ✅ Create Note (send userId in body)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const userId = req.body.userId;
    const result = await NoteManager.addNote(req, userId);
    res.status(result.status).json(result);
  } catch (error) {
    console.error("Create Note Error:", error);
    res.status(httpsCodes.SERVER_ERROR_CODE).json({ error: error.message });
  }
});

// ✅ Get notes by userId (query param)
router.get("/user/:userId", async (req, res) => {
    try {
  const userId = req.params.userId;
    const result = await NoteManager.getNotes(userId);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(httpsCodes.SERVER_ERROR_CODE).json({ error: error.message });
  }
});

// ✅ Update Note
router.patch("/:id", upload.single("image"), async (req, res) => {
  try {
    const noteId = req.params.id;
    const updateData = req.body;
    // Debug log: show received data and file
    console.log("PATCH /api/notes/:id received:", {
      noteId,
      updateData,
      file: req.file,
    });
    const result = await NoteManager.updateNote(noteId, updateData, req.file);
    // Debug log: show result
    console.log("PATCH /api/notes/:id result:", result);
    res.status(result.status).json(result);
  } catch (error) {
    console.error("Update Note Error:", error);
    res.status(httpsCodes.SERVER_ERROR_CODE).json({ error: error.message });
  }
});

// ✅ Delete Note
router.delete("/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const result = await NoteManager.deleteNote(noteId);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(httpsCodes.SERVER_ERROR_CODE).json({ error: error.message });
  }
});

module.exports = router;