'use client';

import { useState } from 'react';

interface TodoFormProps {
  onAdd: (title: string, description: string) => Promise<void>;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await onAdd(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      setExpanded(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6"
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Add a New Todo</h2>
      <div className="flex gap-3 mb-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setExpanded(true)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-gray-800 placeholder-gray-400 transition"
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={!title.trim() || submitting}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
        >
          {submitting ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <span>+ Add</span>
          )}
        </button>
      </div>
      {expanded && (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description..."
          rows={2}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-gray-800 placeholder-gray-400 transition resize-none"
          disabled={submitting}
        />
      )}
    </form>
  );
}
