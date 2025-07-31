import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, addNote as addNoteThunk, updateNote as updateNoteThunk, deleteNote as deleteNoteThunk } from "../features/thunks/notesThunk";
import { useNavigate } from "react-router-dom";

const NotesApp = () => {
  const user = useSelector((state) => state.auth.user);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const dispatch = useDispatch();
  const { notes, loading } = useSelector((state) => state.notes);
  const navigate = useNavigate();
  useEffect(() => {
  if (user?._id) {
    dispatch(fetchNotes(user._id));
  }
}, [dispatch, user]);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tags: "",
    image: null,
  });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const allTags = [...new Set(notes.flatMap((note) => note.tags || []))];
  const filteredNotes = notes.filter(
    (note) =>
      (note.title + note.content)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (selectedTags.length === 0 ||
        selectedTags.every((tag) => note.tags?.includes(tag)))
  );

  const closeModal = () => {
    setEditingNote(null);
    setNewNote({ title: "", content: "", tags: "", image: null });
    setShowAddModal(false);
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

 const handleAddNote = async (note) => {
  await dispatch(addNoteThunk({
    title: note.title,
    content: note.content,
    tags: note.tags,
    userId: user._id,
    image: note.image instanceof File ? note.image : undefined
  }));
};

  const handleEditNote = (note) => {
    setEditingNote(note);
    setNewNote({ ...note, tags: note.tags.join(", ") });
    setShowAddModal(true);
  };

 const handleUpdateNote = async (updatedNote) => {
  // Send tags as comma-separated string for backend compatibility
  const tagsString = typeof updatedNote.tags === "string"
    ? updatedNote.tags
    : (updatedNote.tags || []).join(",");

  await dispatch(updateNoteThunk({
    id: editingNote._id,
    title: updatedNote.title,
    content: updatedNote.content,
    tags: tagsString,
    image: updatedNote.image,
    userId: user._id,
  }));
  // Force refresh notes from backend after update
  if (user?._id) {
    await dispatch(fetchNotes(user._id));
  }
};

const handleDeleteNote = async (id) => {
  await dispatch(deleteNoteThunk(id));
};


  const handleLogout = () => {
    localStorage.removeItem("_token");
    navigate("/login");
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

 const handleDrop = (e) => {
  e.preventDefault();
  setDragActive(false);
  const file = e.dataTransfer.files?.[0];
  if (file) {
    setNewNote((prev) => ({ ...prev, image: file }));
  }
};
 const handleFileSelect = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    setNewNote((prev) => ({ ...prev, image: file }));
  }
};

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <header
        className={`sticky top-0 z-50 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-b shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <i className="fas fa-sticky-note text-2xl text-blue-600 mr-3"></i>
              <h1
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                NotesApp
              </h1>
            </div>

            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                <input
                  type="text"
                  placeholder="Search notes by title or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  darkMode
                    ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <i
                  className={`fas ${darkMode ? "fa-sun" : "fa-moon"} text-lg`}
                ></i>
              </button>

              <div className="relative group">
                <button
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <i className="fas fa-user text-lg"></i>
                </button>

                <div
                  className={`absolute right-0 mt-2 w-48 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  } border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200`}
                >
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <p
                      className={`text-sm font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {user?.name || "Anonymous"}
                    </p>
                    <p
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {user?.email || "unknown@example.com"}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`w-full px-3 py-2 text-left text-sm cursor-pointer transition-colors ${
                      darkMode
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden pb-4">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
          </div>
        </div>
      </header>

      <div
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-b px-4 sm:px-6 lg:px-8 py-3`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <span
              className={`text-sm font-medium whitespace-nowrap ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Filter by tags:
            </span>
            <button
              onClick={() => setSelectedTags([])}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                selectedTags.length === 0
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {(allTags || []).map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note._id || note.id}
              className={`group ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } 
                         border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}
            >
              {note.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={note.image}
                    alt={note.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className={`font-semibold text-lg leading-tight ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {note.title}
                  </h3>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditNote(note)}
                      className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                        darkMode
                          ? "text-gray-400 hover:text-blue-400 hover:bg-gray-700"
                          : "text-gray-400 hover:text-blue-600 hover:bg-gray-100"
                      }`}
                    >
                      <i className="fas fa-edit text-sm"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note._id || note.id)}
                      className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                        darkMode
                          ? "text-gray-400 hover:text-red-400 hover:bg-gray-700"
                          : "text-gray-400 hover:text-red-600 hover:bg-gray-100"
                      }`}
                    >
                      <i className="fas fa-trash text-sm"></i>
                    </button>
                  </div>
                </div>

                <p
                  className={`text-sm mb-3 line-clamp-3 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {note.content}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {(note.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 
                               text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {note.createdAt}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
            <h3
              className={`text-lg font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-900"
              }`}
            >
              No notes found
            </h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </main>

      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white 
                   rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer
                   flex items-center justify-center !rounded-button"
      >
        <i className="fas fa-plus text-xl"></i>
      </button>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
          >
            <div
              className={`sticky top-0 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border-b px-6 py-4`}
            >
              <div className="flex items-center justify-between">
                <h2
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {editingNote ? "Edit Note" : "Add New Note"}
                </h2>
                <button
                  onClick={closeModal}
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${
                    darkMode
                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Title
                </label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) =>
                    setNewNote((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter note title..."
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Content
                </label>
                <textarea
                  value={newNote.content}
                  onChange={(e) =>
                    setNewNote((prev) => ({ ...prev, content: e.target.value }))
                  }
                  rows={6}
                  className={`w-full px-3 py-2 text-sm rounded-lg border resize-none ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Write your note content here..."
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newNote.tags}
                  onChange={(e) =>
                    setNewNote((prev) => ({ ...prev, tags: e.target.value }))
                  }
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="work, personal, ideas..."
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Image
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    dragActive
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : darkMode
                      ? "border-gray-600 hover:border-gray-500"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {newNote.image ? (
                    <div className="space-y-2">
                      <img
                        src={
                          newNote.image instanceof File
                            ? URL.createObjectURL(newNote.image)
                            : newNote.image
                        }
                        alt="Preview"
                        className="mx-auto max-h-32 rounded-lg object-cover"
                      />
                      <div className="flex flex-col items-center space-y-1">
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          Click to change image
                        </p>
                        {editingNote && newNote.image && typeof newNote.image === "string" && (
                          <button
                            type="button"
                            className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              setNewNote((prev) => ({ ...prev, image: "" }));
                            }}
                          >
                            Remove Image
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <i className="fas fa-cloud-upload-alt text-3xl text-gray-400"></i>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Drag and drop an image here, or click to select
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div
              className={`sticky bottom-0 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border-t px-6 py-4`}
            >
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className={`px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors !rounded-button whitespace-nowrap ${
                    darkMode
                      ? "text-gray-300 bg-gray-700 hover:bg-gray-600"
                      : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (editingNote) {
                      handleUpdateNote(newNote);
                    } else {
                      handleAddNote(newNote);
                    }
                    closeModal();
                  }}
                  className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white 
                           rounded-lg cursor-pointer transition-colors !rounded-button whitespace-nowrap"
                >
                  {editingNote ? "Update Note" : "Add Note"}
                </button>
              </div>
            </div>
          </div> 
        </div>
      )}
    </div>
  );
};

export default NotesApp;