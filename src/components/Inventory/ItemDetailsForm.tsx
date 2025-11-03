
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { InventoryFormData } from "@/hooks/useInventoryForm";

interface ItemDetailsFormProps {
  formData: InventoryFormData;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ItemDetailsForm = ({
  formData,
  isSubmitting,
  handleChange,
  handleSelectChange,
  handleSubmit
}: ItemDetailsFormProps) => {
  const navigate = useNavigate();
  
  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name*</Label>
            <Input 
              id="name"
              name="name"
              placeholder="e.g., Surgical Masks N95"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category*</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PPE">Personal Protective Equipment</SelectItem>
                <SelectItem value="medications">Medications</SelectItem>
                <SelectItem value="equipment">Medical Equipment</SelectItem>
                <SelectItem value="disposables">Disposable Supplies</SelectItem>
                <SelectItem value="laboratory">Laboratory Supplies</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity*</Label>
            <Input 
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              placeholder="e.g., 500"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Select 
              value={formData.unit} 
              onValueChange={(value) => handleSelectChange("unit", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="units">Units</SelectItem>
                <SelectItem value="boxes">Boxes</SelectItem>
                <SelectItem value="packs">Packs</SelectItem>
                <SelectItem value="vials">Vials</SelectItem>
                <SelectItem value="bottles">Bottles</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Storage Location*</Label>
            <Input 
              id="location"
              name="location"
              placeholder="e.g., Main Storage, Room 102"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Input 
              id="manufacturer"
              name="manufacturer"
              placeholder="e.g., MedSupply Co."
              value={formData.manufacturer}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input 
              id="expiryDate"
              name="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="minThreshold">Minimum Threshold</Label>
            <Input 
              id="minThreshold"
              name="minThreshold"
              type="number"
              min="0"
              placeholder="e.g., 50"
              value={formData.minThreshold}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500">Alert when inventory falls below this level</p>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Item"}
          </Button>
        </div>
      </form>
    </CardContent>
  );
};

export default ItemDetailsForm;
