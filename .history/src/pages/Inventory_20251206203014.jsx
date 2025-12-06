import React, { useEffect, useState } from 'react';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState('');

  // Fetch inventory on load
  const fetchInventory = () => {
    fetch('http://localhost:5000/api/inventory')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch inventory');
        return res.json();
      })
      .then((data) => setInventory(data))
      .catch((err) => {
        console.error(err);
        setError('Could not load inventory');
      });
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // Delete item handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/inventory/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      // Optimistic UI update
      setInventory((prev) => prev.filter((item) => item.id !== id));

    } catch (err) {
      console.error(err);
      alert("❌ Could not delete item.");
    }
  };

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Inventory</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Quantity</th>
            <th className="border px-2 py-1">Location</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td className="border px-2 py-1">{item.id}</td>
              <td className="border px-2 py-1">{item.name}</td>
              <td className="border px-2 py-1">{item.quantity}</td>
              <td className="border px-2 py-1">{item.location}</td>

              <td className="border px-2 py-1 text-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
