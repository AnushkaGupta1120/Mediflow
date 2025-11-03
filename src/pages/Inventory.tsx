import React, { useEffect, useState } from "react";
import Header from "@/components/Dashboard/Header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  manufacturer: string;
  expiryDate: string;
  minThreshold: number;
}

const Inventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all items from backend
  const fetchInventory = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/inventory");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("❌ Failed to fetch inventory:", err);
      alert("Failed to fetch inventory.");
    } finally {
      setLoading(false);
    }
  };

  // Delete an item
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/inventory/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Item deleted successfully!");
        fetchInventory(); // refresh list
      } else {
        alert("❌ Failed to delete item: " + (data.error || ""));
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("Failed to delete item.");
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="p-4 sm:p-6 max-w-[1000px] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
          </CardHeader>

          {loading ? (
            <p className="p-4">Loading inventory...</p>
          ) : items.length === 0 ? (
            <p className="p-4">No inventory items found.</p>
          ) : (
            <div className="overflow-x-auto p-4">
              <table className="w-full table-auto border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 py-1">ID</th>
                    <th className="border px-2 py-1">Name</th>
                    <th className="border px-2 py-1">Category</th>
                    <th className="border px-2 py-1">Quantity</th>
                    <th className="border px-2 py-1">Unit</th>
                    <th className="border px-2 py-1">Location</th>
                    <th className="border px-2 py-1">Manufacturer</th>
                    <th className="border px-2 py-1">Expiry Date</th>
                    <th className="border px-2 py-1">Min Threshold</th>
                    <th className="border px-2 py-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="border px-2 py-1">{item.id}</td>
                      <td className="border px-2 py-1">{item.name}</td>
                      <td className="border px-2 py-1">{item.category}</td>
                      <td className="border px-2 py-1">{item.quantity}</td>
                      <td className="border px-2 py-1">{item.unit}</td>
                      <td className="border px-2 py-1">{item.location}</td>
                      <td className="border px-2 py-1">{item.manufacturer}</td>
                      <td className="border px-2 py-1">{item.expiryDate}</td>
                      <td className="border px-2 py-1">{item.minThreshold}</td>
                      <td className="border px-2 py-1">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Inventory;
