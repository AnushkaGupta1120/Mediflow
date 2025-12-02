import React from "react";

interface Props {
  formData: any;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ItemDetailsForm: React.FC<Props> = ({ formData, isSubmitting, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input-field"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      <div>
        <label className="block font-medium">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="input-field"
          min={0}
        />
      </div>

      <div>
        <label className="block font-medium">Unit</label>
        <input
          type="text"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      <div>
        <label className="block font-medium">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      <div>
        <label className="block font-medium">Manufacturer</label>
        <input
          type="text"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      <div>
        <label className="block font-medium">Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      <div>
        <label className="block font-medium">Minimum Threshold</label>
        <input
          type="number"
          name="minThreshold"
          value={formData.minThreshold}
          onChange={handleChange}
          className="input-field"
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
