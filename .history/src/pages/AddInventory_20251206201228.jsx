import React, { useState } from 'react';

const categories = [
  'Medicines', 'Personal Protective', 'Respiratory', 
  'Equipment', 'Vascular Access', 'Surgical'
];

const locations = [
  "Main Warehouse",
  "Pharmacy Storage",
  "Emergency Room",
  "Operation Theatre",
  "Cold Storage",
  "General Stock Room"
];

export default function AddInventory() {
  const [formData, setFormData] = useState({
    productName: '',
    sku: '',
    category: '',
    quantity: '',
    reorderLevel: '',
    price: '',
    location: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.productName.trim()) newErrors.productName = 'Product Name is required';
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.quantity || isNaN(formData.quantity) || formData.quantity < 0) newErrors.quantity = 'Enter a valid quantity';
    if (!formData.reorderLevel || isNaN(formData.reorderLevel) || formData.reorderLevel < 0) newErrors.reorderLevel = 'Enter a valid reorder level';
    if (!formData.price || isNaN(formData.price) || formData.price < 0) newErrors.price = 'Enter a valid price';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Inventory item added successfully!");

        setFormData({
          productName: '',
          sku: '',
          category: '',
          quantity: '',
          reorderLevel: '',
          price: '',
          location: '',
        });

        setErrors({});
      } else {
        setMessage(data.message || "❌ Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error: Unable to connect to server.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-[#204671]">Add Inventory</h1>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${message.startsWith("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <InputField
          label="Product Name"
          name="productName"
          value={formData.productName}
          error={errors.productName}
          onChange={handleChange}
        />

        <InputField
          label="SKU"
          name="sku"
          value={formData.sku}
          error={errors.sku}
          onChange={handleChange}
        />

        <SelectField
          label="Category"
          name="category"
          value={formData.category}
          error={errors.category}
          options={categories}
          onChange={handleChange}
        />

        <SelectField
          label="Location"
          name="location"
          value={formData.location}
          error={errors.location}
          options={locations}
          onChange={handleChange}
        />

        <InputField
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          error={errors.quantity}
          onChange={handleChange}
        />

        <InputField
          label="Reorder Level"
          name="reorderLevel"
          type="number"
          value={formData.reorderLevel}
          error={errors.reorderLevel}
          onChange={handleChange}
        />

        <InputField
          label="Price"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          error={errors.price}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-[#204671] text-white px-5 py-2 rounded hover:bg-[#1b385a] transition"
        >
          Add Inventory
        </button>
      </form>
    </div>
  );
}

/* ------------------- REUSABLE INPUT FIELD ------------------ */
const InputField = ({ label, name, value, onChange, error, type = "text", step }) => (
  <div>
    <label className="block font-semibold mb-1" htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      step={step}
      value={value}
      onChange={onChange}
      className={`w-full border px-3 py-2 rounded ${error ? "border-red-500" : "border-gray-300"}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

/* ------------------- REUSABLE SELECT FIELD ------------------ */
const SelectField = ({ label, name, value, onChange, error, options }) => (
  <div>
    <label className="block font-semibold mb-1" htmlFor={name}>{label}</label>
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className={`w-full border px-3 py-2 rounded ${error ? "border-red-500" : "border-gray-300"}`}
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
