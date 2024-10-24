import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import type { Note } from './types';
import { Menu } from 'lucide-react';

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
    }
    return [];
  });
  
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeNote = notes.find((note) => note.id === activeNoteId) || null;

  const handleNewNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleUpdateNote = (updates: Partial<Note>) => {
    if (!activeNoteId) return;
    
    setNotes(notes.map((note) =>
      note.id === activeNoteId
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    ));
  };

  const handleNoteSelect = (id: string) => {
    setActiveNoteId(id);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-white relative">
      <div className={`
        fixed inset-0 bg-black/20 z-10 transition-opacity duration-200
        md:hidden
        ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `} onClick={() => setIsSidebarOpen(false)} />
      
      <div className={`
        fixed md:static inset-y-0 left-0 w-64 bg-gray-50 border-r border-gray-200
        transform transition-transform duration-200 z-20
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <Sidebar
          notes={notes}
          activeNoteId={activeNoteId}
          onNoteSelect={handleNoteSelect}
          onNewNote={handleNewNote}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-4 hover:bg-gray-50"
          >
            <Menu size={24} />
          </button>
        </div>
        <Editor
          note={activeNote}
          onUpdate={handleUpdateNote}
        />
      </div>
    </div>
  );
}

export default App;