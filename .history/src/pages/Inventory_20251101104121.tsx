
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import InventoryTable from "@/components/Dashboard/InventoryTable";
import SearchBar from "@/components/Dashboard/SearchBar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import StatusBadge from "@/components/Dashboard/StatusBadge";

const Inventory = () => {
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Implement search functionality here
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Inventory Management</h1>
              <p className="text-muted-foreground">Manage your medical supplies inventory</p>
            </div>
            <Link to="/add-inventory">
              <Button className="mt-3 sm:mt-0">
                <Plus className="mr-1 h-4 w-4" />
                Add New Item
              </Button>
            </Link>
          </div>
          
          <div className="mb-4">
            <SearchBar placeholder="Search inventory..." onSearch={handleSearch} />
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <InventoryTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inventory;
