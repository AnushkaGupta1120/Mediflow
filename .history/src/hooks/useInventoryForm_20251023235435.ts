
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Inventory item added successfully");
      setIsSubmitting(false);
      navigate("/inventory");
    }, 1500);
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit
  };
};
