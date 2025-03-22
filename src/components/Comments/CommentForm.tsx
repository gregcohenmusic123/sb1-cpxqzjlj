import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface CommentFormProps {
  onSubmit: (content: string) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [content, setContent] = useState('');
  const { user, signIn } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  if (!user) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <p className="text-gray-600 mb-2">Sign in to leave a comment</p>
        <button
          onClick={signIn}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
        rows={3}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        disabled={!content.trim()}
      >
        Post Comment
      </button>
    </form>
  );
}