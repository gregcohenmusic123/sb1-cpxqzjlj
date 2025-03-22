import { useState, useEffect } from 'react';
import { Comment } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { comments as mockComments } from '../data/comments';

export function useComments(trackId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Load mock comments for the specific track
    const trackComments = mockComments.filter(comment => comment.trackId === trackId);
    setComments(trackComments);
    setLoading(false);
  }, [trackId]);

  async function addComment(content: string) {
    if (!user) throw new Error('Must be signed in to comment');

    try {
      const newComment = {
        id: `temp-${Date.now()}`,
        trackId,
        author: user.user_metadata.user_name || user.email || 'Anonymous',
        content,
        timestamp: Date.now(),
        likes: 0
      };

      setComments(prev => [newComment, ...prev]);
      return newComment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  async function likeComment(commentId: string) {
    if (!user) throw new Error('Must be signed in to like comments');

    try {
      setComments(prev =>
        prev.map(comment =>
          comment.id === commentId
            ? { ...comment, likes: comment.likes + 1 }
            : comment
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  return {
    comments,
    loading,
    error,
    addComment,
    likeComment
  };
}