import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { merchItems } from '../data/merch';
import MerchHeader from '../components/Merch/MerchHeader';
import MerchFilters from '../components/Merch/MerchFilters';
import MerchGrid from '../components/Merch/MerchGrid';
import { MerchItem } from '../types/merch';
import { pageAnimation } from '../components/Merch/animations';

export default function MerchPage() {
  const [selectedArtist, setSelectedArtist] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'vinyl' | 't-shirt' | ''>('');

  const filteredItems = merchItems.filter(item => {
    if (selectedArtist && item.artist !== selectedArtist) return false;
    if (selectedType && item.type !== selectedType) return false;
    return true;
  });

  return (
    <motion.div 
      className="space-y-6"
      {...pageAnimation}
    >
      <MerchHeader />
      <MerchFilters
        selectedArtist={selectedArtist}
        selectedType={selectedType}
        onArtistChange={setSelectedArtist}
        onTypeChange={setSelectedType}
      />
      <MerchGrid items={filteredItems} />
    </motion.div>
  );
}