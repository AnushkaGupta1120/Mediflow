import React from 'react';

const dummyNotifications = [
  { id: 1, title: 'Urgent Transfer', time: 'Just now', description: '15 IV sets moved from Storage to ICU.' },
  { id: 2, title: 'Critical Supplies Deployed', time: 'Just now', description: '8 oxygen concentrators dispatched to Ward B.' },
  { id: 3, title: 'Emergency Supplies Arrived', time: 'Just now', description: '120 units of PPE kits delivered to Emergency Room.' },
  { id: 4, title: 'New Shipment Arrived', time: '10:42 AM', description: '250 units of surgical masks received at Storage Room.' },
  { id: 5, title: 'Supplies Transferred', time: '09:37 AM', description: '32 units of syringes moved from Storage to Operating Room A.' },
];

export default function Notifications() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <ul className="space-y-4">
        {dummyNotifications.map(({ id, title, time, description }) => (
          <li key={id} className="border-l-4 border-blue-500 bg-white p-4 shadow rounded-md">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-semibold text-lg">{title}</h3>
              <time className="text-sm text-gray-500">{time}</time>
            </div>
            <p className="text-gray-700">{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
