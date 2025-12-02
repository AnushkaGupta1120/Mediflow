import React from "react";

interface Props {
  formData: any;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string, field: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ItemDetailsForm: React.FC<Props> = ({
  formData,
  isSubmitting,
  handleChange,
  handleSelectChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input-field w-full border rounded p-2"
          required
        />
      </div>

      {/* Category (dropdown example) */}
      <div>
        <label className="block font-medium">Category</label>
        <select
          value={formData.category}
          onChange={(e) => handleSelectChange(e.target.value, "category")}
          className="input-field w-full border rounded p-2"
        >
          <option value="">Select Category</option>
          <option value="Medicine">Medicine</option>
          <option value="Equipment">Equipment</option>
          <option value="Consumable">Consumable</option>
        </select>
      </div>

      {/* Quantity */}
      <div>
        <label className="block font-medium">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="input-field w-full border rounded p-2"
          min={0}
        />
      </div>

      {/* Unit */}
      <div>
        <label className="block font-medium">Unit</label>
        <input
          type="text"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          className="input-field w-full border rounded p-2"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block font-medium">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="input-field w-full border rounded p-2"
        />
      </div>

      {/* Manufacturer */}
      <div>
        <label className="block font-medium">Manufacturer</label>
        <input
          type="text"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          className="input-field w-full border rounded p-2"
        />
      </div>

      {/* Expiry Date */}
      <div>
        <label className="block font-medium">Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          className="input-field w-full border rounded p-2"
        />
      </div>

      {/* Minimum Threshold */}
      <div>
        <label className="block font-medium">Minimum Threshold</label>
        <input
          type="number"
          name="minThreshold"
          value={formData.minThreshold}
          onChange={handleChange}
          className="input-field w-full border rounded p-2"
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
