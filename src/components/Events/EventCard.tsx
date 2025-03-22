import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Bitcoin, Ticket } from 'lucide-react';
import { Event } from '../../types/events';
import { findArtistIdByName } from '../../utils/artistUtils';
import { useModal } from '../../contexts/ModalContext';
import { useAuth } from '../../contexts/AuthContext';
import EventRequirements from './EventRequirements';
import EventTypeLabel from './EventTypeLabel';
import { formatEventDate } from '../../utils/dateUtils';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { user } = useAuth();
  const { openPurchaseModal } = useModal();
  const artistId = findArtistIdByName(event.artist);

  const handleRSVP = () => {
    openPurchaseModal(event.title, event.price, event.artist);
  };

  return (
    <div className="bg-surface rounded-xl overflow-hidden border border-accent/20">
      <div className="relative aspect-video">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <EventTypeLabel type={event.type} />
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-primary text-lg">{event.title}</h3>
          <Link
            to={`/artist/${artistId}`}
            className="text-sm text-primary/60 hover:text-accent transition-colors"
          >
            {event.artist}
          </Link>
        </div>

        <p className="text-sm text-primary/60">{event.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-primary/60">
            <Calendar className="w-4 h-4" />
            <span>{formatEventDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-primary/60">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-primary/60">
            <Users className="w-4 h-4" />
            <span>{event.remaining} spots remaining</span>
          </div>
        </div>

        <EventRequirements requirements={event.requirements} />

        <div className="flex items-center justify-between pt-4 border-t border-accent/20">
          <div className="flex items-center gap-1">
            <Bitcoin className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary">{event.price} BTC</span>
          </div>
          <button
            onClick={handleRSVP}
            disabled={!user}
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-accent/20 text-primary hover:text-accent rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <Ticket className="w-4 h-4" />
            {user ? 'RSVP Now' : 'Sign in to RSVP'}
          </button>
        </div>
      </div>
    </div>
  );
}