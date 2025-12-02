import Header from "@/components/Dashboard/Header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import InventoryPageHeader from "@/components/Inventory/InventoryPageHeader";
import ItemDetailsForm from "@/components/Inventory/ItemDetailsForm";
import { useInventoryForm } from "@/hooks/useInventoryForm";

const AddInventory = () => {
  const { formData, isSubmitting, handleChange, handleSubmit } = useInventoryForm();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="p-4 sm:p-6 max-w-[800px] mx-auto">
        <InventoryPageHeader
          title="Add Inventory Item"
          description="Create a new entry in your medical supply inventory"
          backTo="/inventory"
        />

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Item Details</CardTitle>
          </CardHeader>

          <ItemDetailsForm
            formData={formData}
            isSubmitting={isSubmitting}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Card>
      </main>
    </div>
  );
};

export default AddInventory;
