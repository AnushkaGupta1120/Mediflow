import React from 'react';

const dummyOrders = [
  {
    id: 'ORD001',
    item: 'Surgical Masks',
    quantity: 500,
    status: 'Delivered',
    orderedAt: '2025-06-25 10:00 AM',
    location: 'Storage Room',
  },
  {
    id: 'ORD002',
    item: 'Ventilator Filters',
    quantity: 20,
    status: 'In Transit',
    orderedAt: '2025-06-26 2:30 PM',
    location: 'ICU',
  },
  {
    id: 'ORD003',
    item: 'Disposable Gloves',
    quantity: 1000,
    status: 'Pending',
    orderedAt: '2025-06-27 11:00 AM',
    location: 'Emergency Dept',
  },
];

export default function Orders() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left py-2 px-4 border-r">Order ID</th>
              <th className="text-left py-2 px-4 border-r">Item</th>
              <th className="text-right py-2 px-4 border-r">Quantity</th>
              <th className="text-left py-2 px-4 border-r">Status</th>
              <th className="text-left py-2 px-4 border-r">Ordered At</th>
              <th className="text-left py-2 px-4">Location</th>
            </tr>
          </thead>

          <tbody>
            {dummyOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 border-r">{order.id}</td>
                <td className="py-2 px-4 border-r">{order.item}</td>
                <td className="py-2 px-4 border-r text-right">{order.quantity}</td>
                <td className="py-2 px-4 border-r">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-200 text-green-800'
                        : order.status === 'In Transit'
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-r">{order.orderedAt}</td>
                <td className="py-2 px-4">{order.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
