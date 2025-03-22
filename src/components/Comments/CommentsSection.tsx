import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { comments } from '../../data/comments';

interface CommentsSectionProps {
  trackId: string;
}

export default function CommentsSection({ trackId }: CommentsSectionProps) {
  const trackComments = comments.filter(comment => comment.trackId === trackId);

  const handleAddComment = (content: string) => {
    console.log('Adding comment:', content);
  };
  
  const handleLikeComment = (commentId: string) => {
    console.log('Liking comment:', commentId);
  };

  return (
    <div className="space-y-6">
      <CommentForm onSubmit={handleAddComment} />
      <CommentList comments={trackComments} onLike={handleLikeComment} />
    </div>
  );
}