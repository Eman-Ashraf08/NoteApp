"use strict";

const Note = require("../models/note.model");
const { httpsCodes } = require("../constants/httpsCodes");
const { uploadToCloudinary } = require("../helper/helper");
const { language } = require("../constants/language");

class NoteManager {
  static async addNote(req, userId) {
    try {
      const { title, content, tags } = req.body;
      let imageUrl = null;

      if (req.file) {
        const fileName = `${Date.now()}-${req.file.originalname}`;
        const uploadResult = await uploadToCloudinary(req.file.buffer, fileName);
        imageUrl = uploadResult.secure_url;
      }

      const newNote = new Note({
        userId,
        title,
        content,
        tags: tags?.split(",").map(t => t.trim()),
        image: imageUrl,
      });

      const savedNote = await newNote.save();
      return {
        status: httpsCodes.SUCCESS_CODE,
        message: language.ONE_RECORD_CREATE,
        note: savedNote,
      };
    } catch (error) {
      console.error("Add Note Error:", error);
      return {
        status: httpsCodes.SERVER_ERROR_CODE,
        message: "Failed to create note",
        error: error.message,
      };
    }
  }
static async getNotes(userId) {
  try {
    const trimmedUserId = userId.trim();

    const notes = await Note.find({ userId: trimmedUserId });

    return {
      status: httpsCodes.SUCCESS_CODE,
      message: language.RECORD_FOUND,
      notes,
    };
  } catch (error) {
    return {
      status: httpsCodes.SERVER_ERROR_CODE,
      message: "Failed to fetch notes",
      error: error.message,
    };
  }
}


  static async updateNote(noteId, updateData, file) {
    try {
      let imageUrl = updateData.image || null;

      if (file) {
        const fileName = `${Date.now()}-${file.originalname}`;
        const uploadResult = await uploadToCloudinary(file.buffer, fileName);
        imageUrl = uploadResult.secure_url;
      }

      const updatedNote = await Note.findByIdAndUpdate(
        noteId,
        {
          ...updateData,
          tags: updateData.tags?.split(",").map(t => t.trim()),
          image: imageUrl,
        },
        { new: true }
      );

      if (!updatedNote) {
        return {
          status: httpsCodes.NOT_FOUND,
          message: language.RECORD_NOT_FOUND,
        };
      }

      return {
        status: httpsCodes.SUCCESS_CODE,
        message: language.RECORD_UPDATED,
        note: updatedNote,
      };
    } catch (error) {
      console.error("Update Note Error:", error);
      return {
        status: httpsCodes.SERVER_ERROR_CODE,
        message: "Failed to update note",
        error: error.message,
      };
    }
  }
static async deleteNote(noteId) {
  try {
    const trimmedId = noteId.trim(); 
    const deleted = await Note.findByIdAndDelete(trimmedId);

    if (!deleted) {
      return {
        status: httpsCodes.NOT_FOUND,
        message: language.RECORD_NOT_FOUND,
      };
    }

    return {
      status: httpsCodes.SUCCESS_CODE,
      message: language.ONE_RECORD_DELETE,
    };
  } catch (error) {
    return {
      status: httpsCodes.SERVER_ERROR_CODE,
      message: "Failed to delete note",
      error: error.message,
    };
  }
}

}

module.exports = NoteManager;
