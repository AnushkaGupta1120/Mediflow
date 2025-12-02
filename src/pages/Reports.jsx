import React from 'react';

export default function Reports() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Inventory</h2>
          <p className="text-3xl font-bold">1,373</p>
          <p className="text-green-600">+13 items since last update</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Low Stock Items</h2>
          <p className="text-3xl font-bold">25</p>
          <p className="text-red-600">+1 from yesterday</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">In Transit</h2>
          <p className="text-3xl font-bold">30</p>
          <p className="text-yellow-600">-3 from yesterday</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Inventory Value</h2>
          <p className="text-3xl font-bold">₹2.93 Lakh</p>
          <p className="text-gray-600">-0.1% from yesterday</p>
        </div>
      </div>
    </div>
  );
}
