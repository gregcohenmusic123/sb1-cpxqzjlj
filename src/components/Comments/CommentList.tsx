import React from 'react';
import { Comment } from '../../types';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  onLike: (commentId: string) => void;
}

export default function CommentList({ comments, onLike }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onLike={() => onLike(comment.id)}
        />
      ))}
    </div>
  );
}