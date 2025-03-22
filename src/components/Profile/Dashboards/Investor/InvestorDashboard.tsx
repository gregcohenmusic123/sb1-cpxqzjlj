import React from 'react';
import InvestmentOpportunities from './InvestmentOpportunities';
import InquiryForm from './InquiryForm';
import InvestorStats from './InvestorStats';

export default function InvestorDashboard() {
  const handleInquirySubmit = (inquiry: { subject: string; message: string }) => {
    alert('Thank you for your inquiry. Our team will contact you shortly.');
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg p-6 border border-accent/20">
        <h2 className="text-xl font-mono text-primary mb-4">Investment Opportunities</h2>
        <InvestmentOpportunities />
        <InquiryForm onSubmit={handleInquirySubmit} />
      </div>
      <InvestorStats />
    </div>
  );
}