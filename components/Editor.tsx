'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Note } from '@/app/page';

interface EditorProps {
  note: Note | undefined;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
}

export default function Editor({ note, onUpdateNote }: EditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved'>('saved');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update local state when note changes
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setLastSaved(new Date(note.updatedAt));
      setSaveStatus('saved');
    } else {
      setTitle('');
      setContent('');
      setLastSaved(null);
      setSaveStatus('saved');
    }
  }, [note]);

  // Auto-save functionality with debounce
  useEffect(() => {
    if (!note) return;

    // Check if content actually changed
    const hasChanges = title !== note.title || content !== note.content;
    if (!hasChanges) {
      setSaveStatus('saved');
      return;
    }

    // Set status to saving when user is typing
    setSaveStatus('saving');

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for auto-save (500ms debounce)
    saveTimeoutRef.current = setTimeout(() => {
      onUpdateNote(note.id, { title, content });
      setLastSaved(new Date());
      setSaveStatus('saved');
    }, 500);

    // Cleanup on unmount or when note changes
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [title, content, note, onUpdateNote]);

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center glass-card rounded-2xl p-8">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Select a note to start editing, or create a new one
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Save Status Indicator */}
      <div className="absolute top-4 right-4 z-20">
        <div className="glass-card rounded-xl px-4 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            {saveStatus === 'saving' ? (
              <>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">Saving...</p>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">All changes saved</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex gap-6 min-w-0">
        {/* Editor Panel - flex-1 (widest) */}
        <div className="flex-1 flex flex-col glass-card rounded-2xl overflow-hidden min-w-0">
          <div className="flex-1 overflow-y-auto" style={{ padding: '24px' }}>
            <div className="mb-6 overflow-hidden">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title..."
                className="w-full font-bold bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
                  lineHeight: '1.2',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              />
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your note in Markdown..."
              className="w-full h-full min-h-[500px] text-lg bg-transparent border-none outline-none resize-none text-gray-700 dark:text-gray-300 placeholder-gray-400 leading-relaxed font-mono"
            />
          </div>
        </div>

        {/* Preview Panel - 400px fixed */}
        <div className="w-[400px] flex-shrink-0 flex flex-col glass-card rounded-2xl overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700" style={{ padding: '24px 24px 16px 24px' }}>
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Preview
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto" style={{ padding: '24px' }}>
            {content ? (
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-gray-400 dark:text-gray-500 italic">
                Your Markdown preview will appear here...
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer with timestamp */}
      <div className="px-6 py-3 glass border-t border-white/20">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {lastSaved ? (
            <>Last saved at {lastSaved.toLocaleTimeString()}</>
          ) : (
            <>Auto-save enabled</>
          )}
        </p>
      </div>
    </div>
  );
}
