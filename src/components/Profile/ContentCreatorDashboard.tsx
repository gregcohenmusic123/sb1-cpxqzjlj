import React from 'react';
import { Megaphone, Users, TrendingUp } from 'lucide-react';

export default function ContentCreatorDashboard() {
  const campaigns = [
    {
      id: 1,
      artist: 'CHUCKIE',
      type: 'Social Media Campaign',
      status: 'Active',
      reward: '0.05 BTC',
      deadline: '2025-04-01'
    },
    {
      id: 2,
      artist: 'DJ Cassidy',
      type: 'Content Creation',
      status: 'Open',
      reward: '0.03 BTC',
      deadline: '2025-04-15'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm text-black">
        <h2 className="text-xl font-semibold mb-4 text-black">Available Campaigns</h2>
        <div className="space-y-4">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-black">{campaign.artist}</h3>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {campaign.status}
                </span>
              </div>
              <p className="text-sm text-black mb-2">{campaign.type}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-black">Reward: {campaign.reward}</span>
                <span className="text-black">Deadline: {campaign.deadline}</span>
              </div>
              <button className="mt-3 w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm text-black">
          <div className="flex items-center gap-3 mb-2">
            <Megaphone className="w-5 h-5 text-black" />
            <h3 className="font-medium text-black">Active Campaigns</h3>
          </div>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm text-black">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-black" />
            <h3 className="font-medium text-black">Total Reach</h3>
          </div>
          <p className="text-2xl font-bold">12.5K</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm text-black">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-black" />
            <h3 className="font-medium text-black">Earnings</h3>
          </div>
          <p className="text-2xl font-bold">0.15 BTC</p>
        </div>
      </div>
    </div>
  );
}