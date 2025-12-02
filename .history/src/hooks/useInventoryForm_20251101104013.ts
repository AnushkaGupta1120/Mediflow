import { useState } from "react";

export const useInventoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 0,
    unit: "",
    location: "",
    manufacturer: "",
    expiryDate: "",
    minThreshold: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // For text/number inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "minThreshold" ? parseInt(value) : value,
    }));
  };

  // For dropdown/select inputs
  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit form to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        alert("✅ Item added successfully!");
        window.location.href = "/inventory"; // redirect
      } else {
        alert("❌ Error: " + (data.error || "Failed to add item"));
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("Network error, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, isSubmitting, handleChange, handleSelectChange, handleSubmit };
};
