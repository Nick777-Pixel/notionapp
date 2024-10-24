import React, { useEffect, useRef } from 'react';
import type { Note } from '../types';
import RichTextEditor from './RichTextEditor';

interface EditorProps {
  note: Note | null;
  onUpdate: (updates: Partial<Note>) => void;
}

export default function Editor({ note, onUpdate }: EditorProps) {
  const titleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [note?.title]);

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 p-4 text-center">
        <p>Select a note or create a new one</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        <textarea
          ref={titleRef}
          value={note.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Untitled"
          className="w-full text-2xl md:text-4xl font-bold bg-transparent border-none outline-none resize-none overflow-hidden mb-4"
          rows={1}
        />
        <RichTextEditor
          content={note.content}
          onChange={(content) => onUpdate({ content })}
        />
      </div>
    </div>
  );
}