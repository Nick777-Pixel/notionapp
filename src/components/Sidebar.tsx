import React from 'react';
import { Plus, Search, FileText } from 'lucide-react';
import type { Note } from '../types';

interface SidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  onNoteSelect: (id: string) => void;
  onNewNote: () => void;
}

export default function Sidebar({ notes, activeNoteId, onNoteSelect, onNewNote }: SidebarProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <button
          onClick={onNewNote}
          className="w-full flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors touch-manipulation"
        >
          <Plus size={20} />
          <span>New Note</span>
        </button>
        
        <div className="mt-4 relative">
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {notes.map((note) => (
          <button
            key={note.id}
            onClick={() => onNoteSelect(note.id)}
            className={`w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-gray-100 transition-colors touch-manipulation ${
              activeNoteId === note.id ? 'bg-gray-100' : ''
            }`}
          >
            <FileText size={18} className="text-gray-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">
                {note.title || 'Untitled'}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {new Date(note.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}