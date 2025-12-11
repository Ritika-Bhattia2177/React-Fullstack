import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, Trash2, Calendar } from "lucide-react";

export default function TripNotes() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  const handleAddNote = () => {
    if (input.trim()) {
      const newNote = {
        text: input,
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setNotes([newNote, ...notes]);
      setInput("");
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAddNote();
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200 via-purple-100 to-pink-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Trip Notes
          </h1>
          <p className="text-slate-600 text-lg">Capture your travel ideas, memories, and plans</p>
        </motion.div>

        {/* Add Note Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl shadow-2xl p-[1px] bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 mb-8"
        >
          <div className="rounded-2xl bg-white p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Plus className="w-5 h-5 text-indigo-500" />
              <h2 className="text-xl font-bold text-slate-800">New Note</h2>
            </div>
            <textarea
              className="w-full h-32 p-4 rounded-lg border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mb-4 text-slate-900 placeholder-slate-400 transition"
              placeholder="Write your travel note here... (Ctrl+Enter to save)"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-slate-500">💡 Tip: Press Ctrl+Enter to quickly add your note</span>
              <button
                className={`px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 flex items-center gap-2 ${
                  input.trim()
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:shadow-indigo-400/50 hover:scale-[1.02]'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                onClick={handleAddNote}
                disabled={!input.trim()}
              >
                <Plus className="w-5 h-5" />
                Add Note
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notes List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {notes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-16 bg-white/50 backdrop-blur rounded-2xl border-2 border-dashed border-slate-300"
              >
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-lg font-medium">No notes yet</p>
                <p className="text-slate-400 text-sm mt-2">Start capturing your travel memories!</p>
              </motion.div>
            ) : (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-600 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Your Notes ({notes.length})
                </h3>
                {notes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl p-5 border-l-4 border-indigo-400 mb-3 transition-all duration-200 hover:scale-[1.01]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{note.text}</p>
                        <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
                          <Calendar className="w-3 h-3" />
                          {note.date}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"
                        title="Delete note"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
