
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { ArrowDownUp, Filter } from "lucide-react";

// Types for supply items
interface SupplyItem {
  id: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  threshold: number;
  status: "available" | "low" | "critical" | "in-transit";
  lastUpdated: string;
}

// Example supply data - in a real app this would come from an API
const supplyData: SupplyItem[] = [
  {
    id: "SUP001",
    name: "Surgical Masks",
    category: "Personal Protective",
    location: "Storage Room",
    quantity: 1250,
    threshold: 500,
    status: "available",
    lastUpdated: "Today, 10:42 AM"
  },
  {
    id: "SUP002",
    name: "Disposable Gloves",
    category: "Personal Protective",
    location: "Emergency Dept",
    quantity: 350,
    threshold: 400,
    status: "low",
    lastUpdated: "Today, 09:15 AM"
  },
  {
    id: "SUP003",
    name: "Ventilator Filters",
    category: "Respiratory",
    location: "ICU",
    quantity: 45,
    threshold: 50,
    status: "low",
    lastUpdated: "Yesterday"
  },
  {
    id: "SUP004",
    name: "Infusion Pumps",
    category: "Equipment",
    location: "Operating Room A",
    quantity: 12,
    threshold: 10,
    status: "available",
    lastUpdated: "2 days ago"
  },
  {
    id: "SUP005",
    name: "IV Catheters",
    category: "Vascular Access",
    location: "Central Supply",
    quantity: 25,
    threshold: 100,
    status: "critical",
    lastUpdated: "Today, 08:30 AM"
  },
  {
    id: "SUP006",
    name: "Surgical Kits",
    category: "Surgical",
    location: "In Transit",
    quantity: 40,
    threshold: 20,
    status: "in-transit",
    lastUpdated: "Today, 11:20 AM"
  },
];

// Simulate real-time updates
const simulateRealTimeUpdates = (callback: (data: SupplyItem[]) => void) => {
  const interval = setInterval(() => {
    // Randomly update some inventory data
    const updatedData = [...supplyData];
    const itemToUpdate = Math.floor(Math.random() * updatedData.length);
    
    // Random quantity change between -10 and +15
    const quantityChange = Math.floor(Math.random() * 25) - 10;
    updatedData[itemToUpdate] = {
      ...updatedData[itemToUpdate],
      quantity: Math.max(0, updatedData[itemToUpdate].quantity + quantityChange),
      lastUpdated: "Just now"
    };
    
    // Update status based on threshold
    if (updatedData[itemToUpdate].quantity <= 0) {
      updatedData[itemToUpdate].status = "critical";
    } else if (updatedData[itemToUpdate].quantity < updatedData[itemToUpdate].threshold) {
      updatedData[itemToUpdate].status = "low";
    } else {
      updatedData[itemToUpdate].status = "available";
    }
    
    callback(updatedData);
  }, 5000); // Update every 5 seconds
  
  return () => clearInterval(interval);
};

const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState(supplyData);
  const [filteredData, setFilteredData] = useState(supplyData);
  const [sortField, setSortField] = useState<keyof SupplyItem | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Set up real-time updates
    const cleanupFn = simulateRealTimeUpdates((newData) => {
      setIsUpdating(true);
      setInventoryData(newData);
      
      // Filter the updated data with current search query
      handleSearch(''); // Re-filter with current query
      
      // Flash animation effect for updates
      setTimeout(() => {
        setIsUpdating(false);
      }, 300);
    });
    
    return cleanupFn;
  }, []);
  
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredData(inventoryData);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = inventoryData.filter(
      item => 
        item.name.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery) ||
        item.location.toLowerCase().includes(lowerQuery) ||
        item.id.toLowerCase().includes(lowerQuery)
    );
    
    setFilteredData(filtered);
  };
  
  const handleSort = (field: keyof SupplyItem) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
    
    const sorted = [...filteredData].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? 1 : -1;
      if (a[field] > b[field]) return isAsc ? -1 : 1;
      return 0;
    });
    
    setFilteredData(sorted);
  };

  return (
    <Card className={`col-span-1 lg:col-span-3 border border-gray-200 transition-all ${isUpdating ? 'bg-gray-50' : 'bg-white'}`}>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg font-medium text-secondary">Inventory Status</CardTitle>
          <div className="w-full sm:w-64">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="cursor-pointer" onClick={() => handleSort('id')}>
                  <div className="flex items-center">
                    ID <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                  <div className="flex items-center">
                    Item <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell cursor-pointer" onClick={() => handleSort('category')}>
                  <div className="flex items-center">
                    Category <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('location')}>
                  <div className="flex items-center">
                    Location <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort('quantity')}>
                  <div className="flex items-center justify-end">
                    Quantity <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    No items found matching your search
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id} className={item.lastUpdated === "Just now" ? "bg-yellow-50" : ""}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.category}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell className="text-right">
                      <span className={`font-medium ${item.quantity < item.threshold ? 'text-warning' : ''}`}>{item.quantity}</span>
                      <span className="text-gray-500 text-xs"> / {item.threshold}</span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <StatusBadge status={item.status} />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-gray-500 text-sm">
                      {item.lastUpdated === "Just now" ? (
                        <span className="text-primary font-medium">{item.lastUpdated}</span>
                      ) : (
                        item.lastUpdated
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryTable;
