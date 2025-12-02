import React from 'react';

export default function Products() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <p className="text-gray-700 mb-4">Manage your medical products here.</p>

      {/* Example dummy table */}
      <table className="min-w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Product Name</th>
            <th className="border px-4 py-2 text-left">SKU</th>
            <th className="border px-4 py-2 text-left">Category</th>
            <th className="border px-4 py-2 text-left">Quantity</th>
            <th className="border px-4 py-2 text-left">Reorder Level</th>
            <th className="border px-4 py-2 text-left">Price</th>
            <th className="border px-4 py-2 text-left">Supplier</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border px-4 py-2">Paracetamol</td>
            <td className="border px-4 py-2">PARA-001</td>
            <td className="border px-4 py-2">Medicines</td>
            <td className="border px-4 py-2">8</td>
            <td className="border px-4 py-2">10</td>
            <td className="border px-4 py-2">₹4299</td>
            <td className="border px-4 py-2">Supplier A</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="border px-4 py-2">Surgical Mask</td>
            <td className="border px-4 py-2">MASK-002</td>
            <td className="border px-4 py-2">Protective Gear</td>
            <td className="border px-4 py-2">500</td>
            <td className="border px-4 py-2">200</td>
            <td className="border px-4 py-2">₹171~</td>
            <td className="border px-4 py-2">Supplier B</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
}
