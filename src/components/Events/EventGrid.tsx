import React from 'react';
import { motion } from 'framer-motion';
import { Event } from '../../types/events';
import EventCard from './EventCard';
import { gridAnimation, gridItemAnimation } from './animations';

interface EventGridProps {
  events: Event[];
}

export default function EventGrid({ events }: EventGridProps) {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={gridAnimation}
      initial="hidden"
      animate="show"
    >
      {events.map(event => (
        <motion.div
          key={event.id}
          variants={gridItemAnimation}
        >
          <EventCard
            event={event} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
}