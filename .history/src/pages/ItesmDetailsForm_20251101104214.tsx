import React from "react";

interface ItemDetailsFormProps {
  formData: {
    name: string;
    category: string;
    quantity: number;
    unit: string;
    location: string;
    manufacturer: string;
    expiryDate: string;
    minThreshold: number;
  };
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string, field: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ItemDetailsForm: React.FC<ItemDetailsFormProps> = ({
  formData,
  isSubmitting,
  handleChange,
  handleSelectChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      
      {/* Name */}
      <div>
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={handleChange}
          name="name"
          className="w-full border rounded p-2"
          required
        />
      </div>

      {/* Category Dropdown */}
      <div>
        <label className="block font-medium mb-1">Category</label>
        <select
          value={formData.category}
          onChange={(e) => handleSelectChange(e.target.value, "category")}
          className="w-full border rounded p-2"
        >
          <option value="">Select Category</option>
          <option value="Medicine">Medicine</option>
          <option value="Equipment">Equipment</option>
          <option value="Consumable">Consumable</option>
        </select>
      </div>

      {/* Quantity */}
      <div>
        <label className="block font-medium mb-1">Quantity</label>
        <input
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          name="quantity"
          className="w-full border rounded p-2"
          min={0}
        />
      </div>

      {/* Unit */}
      <div>
        <label className="block font-medium mb-1">Unit</label>
        <input
          type="text"
          value={formData.unit}
          onChange={handleChange}
          name="unit"
          className="w-full border rounded p-2"
        />
      </div>

      {/* Location Dropdown */}
      <div>
        <label className="block font-medium mb-1">Location</label>
        <select
          value={formData.location}
          onChange={(e) => handleSelectChange(e.target.value, "location")}
          className="w-full border rounded p-2"
        >
          <option value="">Select Location</option>
          <option value="Warehouse 1">Warehouse 1</option>
          <option value="Warehouse 2">Warehouse 2</option>
          <option value="Warehouse 3">Warehouse 3</option>
        </select>
      </div>

      {/* Manufacturer */}
      <div>
        <label className="block font-medium mb-1">Manufacturer</label>
        <input
          type="text"
          value={formData.manufacturer}
          onChange={handleChange}
          name="manufacturer"
          className="w-full border rounded p-2"
        />
      </div>

      {/* Expiry Date */}
      <div>
        <label className="block font-medium mb-1">Expiry Date</label>
        <input
          type="date"
          value={formData.expiryDate}
          onChange={handleChange}
          name="expiryDate"
          className="w-full border rounded p-2"
        />
      </div>

      {/* Minimum Threshold */}
      <div>
        <label className="block font-medium mb-1">Minimum Threshold</label>
        <input
          type="number"
          value={formData.minThreshold}
          onChange={handleChange}
          name="minThreshold"
          className="w-full border rounded p-2"
          min={0}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isSubmitting ? "Adding..." : "Add Item"}
      </button>
    </form>
  );
};

export default ItemDetailsForm;
