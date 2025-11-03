
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type InventoryFormData = {
  name: string;
  category: string;
  quantity: string;
  unit: string;
  location: string;
  manufacturer: string;
  expiryDate: string;
  minThreshold: string;
};

export const useInventoryForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<InventoryFormData>({
    name: "",
    category: "",
    quantity: "",
    unit: "units",
    location: "",
    manufacturer: "",
    expiryDate: "",
    minThreshold: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const res = await fetch("http://localhost:5000/api/inventory/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Item added successfully!");
      window.location.href = "/inventory"; // navigate to inventory page
    } else {
      alert("Failed to add item: " + data.error);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
};


  return {
    formData,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit
  };
};
