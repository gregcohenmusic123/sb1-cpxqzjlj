import React, { useState } from 'react';
import { TrendingUp, PieChart, Mail } from 'lucide-react';

export default function InvestorDashboard() {
  const [inquiry, setInquiry] = useState({
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement inquiry submission
    alert('Thank you for your inquiry. Our team will contact you shortly.');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm text-black">
        <h2 className="text-xl font-semibold mb-4 text-black">Investment Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2 text-black">Platform Growth Fund</h3>
            <p className="text-sm text-black mb-2">
              Participate in the platform's expansion and ecosystem development.
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-black">Min Investment: 1 BTC</span>
              <span className="text-black">Term: 24 months</span>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2 text-black">Artist Revenue Share</h3>
            <p className="text-sm text-black mb-2">
              Invest in top-performing artists and earn from their success.
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-black">Min Investment: 0.5 BTC</span>
              <span className="text-black">Term: 12 months</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Subject
            </label>
            <input
              type="text"
              value={inquiry.subject}
              onChange={(e) => setInquiry({ ...inquiry, subject: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Message
            </label>
            <textarea
              rows={4}
              value={inquiry.message}
              onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Submit Inquiry
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm text-black">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-black" />
            <h3 className="font-medium text-black">Portfolio Value</h3>
          </div>
          <p className="text-2xl font-bold">2.5 BTC</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm text-black">
          <div className="flex items-center gap-3 mb-2">
            <PieChart className="w-5 h-5 text-black" />
            <h3 className="font-medium text-black">Active Investments</h3>
          </div>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm text-black">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-5 h-5 text-black" />
            <h3 className="font-medium text-black">Open Inquiries</h3>
          </div>
          <p className="text-2xl font-bold">1</p>
        </div>
      </div>
    </div>
  );
}