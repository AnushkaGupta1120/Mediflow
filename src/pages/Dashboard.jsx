import React from 'react';
import DeliveryTracker from '../components/DeliveryTracker';

export default function Dashboard() {
  // Dummy summary data — replace with your actual data or API fetch
  const summary = {
    labels: ['Total Inventory', 'Low Stock Items', 'In Transit', 'Inventory Value'],
    values: ['1,373', '25', '30', 293100],  // Inventory value as number (in rupees)
    changes: ['+13 items since last update', '+1 from yesterday', '-3 from yesterday', '-0.1% from yesterday'],
  };

  // Helper function to format currency in ₹
  const formatRupees = (value) => {
    return value.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-[#204671] text-4xl font-bold mb-5">Medical Supply Dashboard</h1>
      <p className="text-gray-600 text-lg mb-6">Real-time inventory tracking and management system</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {summary.labels.map((label, idx) => (
          <div key={label} className="bg-white shadow rounded p-4">
            <h2 className="text-gray-600 font-semibold">{label}</h2>
            <p className="text-3xl font-bold text-[#204671]">
              {label === 'Inventory Value'
                ? formatRupees(summary.values[idx])
                : summary.values[idx]}
            </p>
            <p className="text-green-600 text-sm mt-1">{summary.changes[idx]}</p>
          </div>
        ))}
      </div>

      {/* ✅ Real-time delivery tracking component here */}
      <DeliveryTracker />

      {/* Future sections like Supply Location Map, Recent Activity etc. */}
    </div>
  );
}
