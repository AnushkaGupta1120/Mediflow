import React from 'react';

export default function DeliveryTracker() {
  return (
    <div className="bg-white shadow rounded p-4 mb-6">
      <h2 className="text-[#204671] text-2xl font-bold mb-4">Real-time Delivery Tracking</h2>

      {/* Simple placeholder map — replace src with actual map embed URL if you have one */}
      <div className="w-full h-64 border rounded overflow-hidden">
        <iframe
          title="Delivery Map"
          src="https://www.openstreetmap.org/export/embed.html"
          className="w-full h-full"
        ></iframe>
      </div>

      <p className="text-gray-600 text-sm mt-2">Showing current supply vehicle locations</p>
    </div>
  );
}
