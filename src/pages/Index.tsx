
import { useState } from "react";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import StatsCards from "@/components/Dashboard/StatsCards";
import InventoryTable from "@/components/Dashboard/InventoryTable";
import ActivityTimeline from "@/components/Dashboard/ActivityTimeline";
import SupplyMap from "@/components/Dashboard/SupplyMap";

const Index = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {showSidebar && <Sidebar />}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-secondary mb-2">Medical Supply Dashboard</h1>
              <p className="text-muted-foreground">Real-time inventory tracking and management system</p>
            </div>
            
            <StatsCards />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="lg:col-span-2">
                <SupplyMap />
              </div>
              <div className="lg:col-span-1">
                <ActivityTimeline />
              </div>
            </div>
            
            <div className="mb-6">
              <InventoryTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
