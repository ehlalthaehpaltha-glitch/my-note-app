'use client';

import { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import Editor from '@/components/Editor';
import SearchBar from '@/components/SearchBar';

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);
      if (parsedNotes.length > 0 && !selectedNoteId) {
        setSelectedNoteId(parsedNotes[0].id);
      }
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  // Get filtered notes based on search query
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get currently selected note
  const selectedNote = notes.find(note => note.id === selectedNoteId);

  // Create a new note
  const handleNewNote = useCallback(() => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      updatedAt: Date.now(),
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
    setSearchQuery('');
  }, []);

  // Update a note
  const handleUpdateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id
          ? { ...note, ...updates, updatedAt: Date.now() }
          : note
      )
    );
  }, []);

  // Delete a note
  const handleDeleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (selectedNoteId === id) {
      const remainingNotes = notes.filter(note => note.id !== id);
      setSelectedNoteId(remainingNotes.length > 0 ? remainingNotes[0].id : null);
    }
  }, [selectedNoteId, notes]);

  return (
    <div className="flex h-screen w-full relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.3),transparent_50%)]"></div>
      </div>

      {/* Main Container with all columns */}
      <div className="flex w-full h-full gap-6 p-6 relative z-10">
        {/* Sidebar - 300px fixed */}
        <div className="w-[300px] flex-shrink-0 glass rounded-2xl flex flex-col border border-white/20 overflow-hidden">
          <div className="p-4 border-b border-white/20">
            <button
              onClick={handleNewNote}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              + New Note
            </button>
          </div>
          <Sidebar
            notes={filteredNotes}
            selectedNoteId={selectedNoteId}
            onSelectNote={setSelectedNoteId}
            onDeleteNote={handleDeleteNote}
          />
        </div>

        {/* Main Content Area - Editor and Preview */}
        <div className="flex-1 flex flex-col min-w-0">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <Editor
            note={selectedNote}
            onUpdateNote={handleUpdateNote}
          />
        </div>
      </div>
    </div>
  );
}
