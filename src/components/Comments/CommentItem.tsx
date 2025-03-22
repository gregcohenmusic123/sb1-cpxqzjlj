import React from 'react';
import { Heart } from 'lucide-react';
import { Comment } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface CommentItemProps {
  comment: Comment;
  onLike: () => void;
}

export default function CommentItem({ comment, onLike }: CommentItemProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-gray-900">{comment.author}</h4>
          <p className="text-sm text-gray-500">{formatDate(comment.timestamp)}</p>
        </div>
        <button
          onClick={onLike}
          className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
        >
          <Heart className="w-4 h-4" />
          <span className="text-sm">{comment.likes}</span>
        </button>
      </div>
      <p className="mt-2 text-gray-700">{comment.content}</p>
    </div>
  );
}