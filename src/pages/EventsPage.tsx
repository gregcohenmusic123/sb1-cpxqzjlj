import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { events } from '../data/events';
import EventHeader from '../components/Events/EventHeader';
import EventFilters from '../components/Events/EventFilters';
import EventGrid from '../components/Events/EventGrid';
import { Event } from '../types/events';
import { pageAnimation } from '../components/Events/animations';

export default function EventsPage() {
  const [selectedArtist, setSelectedArtist] = useState<string>('');
  const [selectedType, setSelectedType] = useState<Event['type'] | ''>('');

  const filteredEvents = events.filter(event => {
    if (selectedArtist && event.artist !== selectedArtist) return false;
    if (selectedType && event.type !== selectedType) return false;
    return true;
  });

  return (
    <motion.div 
      className="space-y-6"
      {...pageAnimation}
    >
      <EventHeader />
      <EventFilters
        selectedArtist={selectedArtist}
        selectedType={selectedType}
        onArtistChange={setSelectedArtist}
        onTypeChange={setSelectedType}
      />
      <EventGrid events={filteredEvents} />
    </motion.div>
  );
}