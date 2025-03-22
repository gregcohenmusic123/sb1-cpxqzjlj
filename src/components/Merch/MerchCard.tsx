import React from 'react';
import { Link } from 'react-router-dom';
import { Bitcoin, ShoppingCart } from 'lucide-react';
import { MerchItem } from '../../types/merch';
import { useModal } from '../../contexts/ModalContext';
import { findArtistIdByName } from '../../utils/artistUtils';
import MerchAttributes from './MerchAttributes';
import MerchStock from './MerchStock';

interface MerchCardProps {
  item: MerchItem;
}

export default function MerchCard({ item }: MerchCardProps) {
  const artistId = findArtistIdByName(item.artist);
  const { openPurchaseModal } = useModal();

  const handlePurchase = () => {
    openPurchaseModal(item.name, item.price, item.artist);
  };

  return (
    <div className="bg-surface rounded-xl overflow-hidden border border-accent/20">
      <div className="relative aspect-square">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <MerchStock inStock={item.inStock} />
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-primary text-lg">{item.name}</h3>
          <Link
            to={`/artist/${artistId}`}
            className="text-sm text-primary/60 hover:text-accent transition-colors"
          >
            {item.artist}
          </Link>
        </div>

        <p className="text-sm text-primary/60">{item.description}</p>

        <MerchAttributes attributes={item.attributes} />

        <div className="flex items-center justify-between pt-4 border-t border-accent/20">
          <div className="flex items-center gap-1 text-primary">
            <Bitcoin className="w-5 h-5" />
            <span className="font-bold">{item.price} BTC</span>
          </div>
          <button
            onClick={handlePurchase}
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-accent/20 text-primary hover:text-accent rounded-lg transition-colors text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}