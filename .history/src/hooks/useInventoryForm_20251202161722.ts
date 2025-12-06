
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Build payload with proper types
    const payload = {
      name: formData.name,
      category: formData.category,
      quantity: Number(formData.quantity) || 0,
      unit: formData.unit,
      location: formData.location,
      manufacturer: formData.manufacturer,
      expiryDate: formData.expiryDate || null,
      minThreshold: Number(formData.minThreshold) || 0,
    };

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/inventory`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.error || err?.details || res.statusText || "Failed to create item");
        }

        const data = await res.json();
        toast.success("Inventory item added successfully");
        setIsSubmitting(false);
        // navigate to inventory list so user can see the new item
        navigate("/inventory");
      } catch (error: any) {
        console.error("Create inventory error:", error);
        toast.error(error?.message || "Failed to add inventory item");
        setIsSubmitting(false);
      }
    })();
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit
  };
};
