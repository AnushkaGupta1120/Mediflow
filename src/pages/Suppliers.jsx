import React, { useState } from 'react';

export default function Suppliers() {
  const [supplierName, setSupplierName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [previousSupplies, setPreviousSupplies] = useState('');
  const [rating, setRating] = useState('');

  const handleAddSupplier = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          supplierName,
          contact,
          address,
          previousSupplies,
          rating,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add supplier');
      }

      alert('Supplier added successfully!');
      // Clear form fields
      setSupplierName('');
      setContact('');
      setAddress('');
      setPreviousSupplies('');
      setRating('');

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 className="text-3xl font-bold mb-6">Add Supplier</h1>
      <form onSubmit={handleAddSupplier} className="space-y-4">
        <div>
          <label className="font-semibold">Supplier Name:</label><br />
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            required
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Contact:</label><br />
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Address:</label><br />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Previous Supplies:</label><br />
          <input
            type="text"
            value={previousSupplies}
            onChange={(e) => setPreviousSupplies(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Rating:</label><br />
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-5 py-2 bg-[#204671] text-white rounded hover:bg-[#16324c] transition"
        >
          Add Supplier
        </button>
      </form>
    </div>
  );
}
