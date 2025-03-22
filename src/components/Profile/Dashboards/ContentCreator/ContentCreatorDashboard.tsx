import React from 'react';
import CampaignList from './CampaignList';
import CreatorStats from './CreatorStats';

const campaigns = [
  {
    id: 1,
    artist: 'CHUCKIE',
    type: 'Social Media Campaign',
    status: 'Active' as const,
    reward: '0.05 BTC',
    deadline: '2025-04-01'
  },
  {
    id: 2,
    artist: 'DJ Cassidy',
    type: 'Content Creation',
    status: 'Open' as const,
    reward: '0.03 BTC',
    deadline: '2025-04-15'
  }
];

export default function ContentCreatorDashboard() {
  const handleApply = (campaignId: number) => {
    alert(`Applied to campaign ${campaignId}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg p-6 border border-accent/20">
        <h2 className="text-xl font-mono text-primary mb-4">Available Campaigns</h2>
        <CampaignList campaigns={campaigns} onApply={handleApply} />
      </div>
      <CreatorStats />
    </div>
  );
}