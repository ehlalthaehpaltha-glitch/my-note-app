'use client';

import { Note } from '@/app/page';

interface SidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

export default function Sidebar({
  notes,
  selectedNoteId,
  onSelectNote,
  onDeleteNote,
}: SidebarProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getSnippet = (content: string, maxLength: number = 100) => {
    if (!content) return 'No content';
    // Remove markdown syntax for preview
    const plainText = content
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
      .replace(/`(.*?)`/g, '$1') // Remove inline code
      .trim();
    
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  if (notes.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 text-gray-500 dark:text-gray-400 text-center">
        <p className="text-sm">No notes yet. Create your first note!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-3">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`group glass-card rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
            selectedNoteId === note.id
              ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-lg scale-[1.02]'
              : ''
          }`}
          onClick={() => onSelectNote(note.id)}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate flex-1">
              {note.title || 'Untitled Note'}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this note?')) {
                  onDeleteNote(note.id);
                }
              }}
              className="ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              aria-label="Delete note"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
            {formatDate(note.updatedAt)}
          </p>
          
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
            {getSnippet(note.content)}
          </p>
        </div>
      ))}
    </div>
  );
}
