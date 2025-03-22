import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import TradingView from '../components/Terminal/TradingView/TradingView';
import MarketOverview from '../components/Terminal/MarketOverview/MarketOverview';
import { Navigate } from 'react-router-dom';

export default function TradingTerminal() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-primary font-bold">Trading Terminal</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TradingView />
        </div>
        <div>
          <MarketOverview />
        </div>
      </div>
    </div>
  );
}