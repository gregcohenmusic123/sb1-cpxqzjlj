import React from 'react';
import { MessageCircle, Bitcoin } from 'lucide-react';

interface TrackActionsProps {
  price: number;
  showComments?: boolean;
  onToggleComments?: () => void;
  onPurchase: () => void;
}

export default function TrackActions({
  price,
  showComments,
  onToggleComments,
  onPurchase
}: TrackActionsProps) {
  return (
    <div className="mt-2 md:mt-4 flex items-center justify-between">
      <div className="flex items-center space-x-1">
        <div className="flex items-center gap-1">
          <Bitcoin className="w-3 h-3 md:w-4 md:h-4 text-primary" />
          <span className="text-[10px] md:text-sm text-primary">{price}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 md:gap-2">
        {showComments && onToggleComments && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComments();
            }}
            className="p-1 hover:text-accent transition-colors flex items-center gap-1"
          >
            <MessageCircle className="w-3 h-3 md:w-5 md:h-5 text-primary" />
            <span className="text-[10px] md:text-sm text-primary">Comments</span>
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPurchase();
          }}
          className="px-2 py-0.5 md:px-4 md:py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-[10px] md:text-sm border border-accent/20"
        >
          Buy
        </button>
      </div>
    </div>
  );
}