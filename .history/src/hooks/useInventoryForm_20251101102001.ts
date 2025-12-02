// hooks/useInventoryForm.js
import { useState } from 'react';
// import { useRouter } from 'next/navigation';

export const useInventoryForm = () => {
  // const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: 'pieces',
    reorderLevel: '',
    expiryDate: '',
    supplier: '',
    batchNumber: '',
    costPrice: '',
    sellingPrice: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      const result = await response.json();
      console.log('✅ Item added:', result);

      // ✅ CRITICAL: Navigate back and refresh
      router.push('/inventory');
      router.refresh(); // This triggers a refetch
      
    } catch (error) {
      console.error('❌ Error adding item:', error);
      alert('Failed to add item. Please try again.');
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
