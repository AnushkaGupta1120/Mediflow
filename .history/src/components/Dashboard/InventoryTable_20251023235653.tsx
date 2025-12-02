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
import { ArrowDownUp } from "lucide-react";

// Types for supply items
interface SupplyItem {
  id: number;
  productName: string;
  category: string;
  quantity: number;
  reorderLevel: number;
  price: number;
  sku: string;
}

const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState<SupplyItem[]>([]);
  const [filteredData, setFilteredData] = useState<SupplyItem[]>([]);
  const [sortField, setSortField] = useState<keyof SupplyItem | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/inventory');
        if (!response.ok) {
          throw new Error('Failed to fetch inventory');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        setInventoryData(data);
        setFilteredData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setIsLoading(false);
      }
    };

    fetchInventory();
    
    // Optional: Refresh data every 10 seconds
    const interval = setInterval(fetchInventory, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredData(inventoryData);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = inventoryData.filter(
      item => 
        item.productName.toLowerCase().includes(lowerQuery) ||
        (item.category && item.category.toLowerCase().includes(lowerQuery)) ||
        item.id.toString().includes(lowerQuery)
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

  const getStatus = (quantity: number, threshold: number) => {
    if (quantity === 0) return "critical";
    if (quantity < threshold) return "low";
    return "available";
  };

  if (isLoading) {
    return (
      <Card className="col-span-1 lg:col-span-3 border border-gray-200">
        <CardContent className="p-8 text-center">
          <p>Loading inventory...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 lg:col-span-3 border border-gray-200 bg-white">
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
                <TableHead className="cursor-pointer" onClick={() => handleSort('productName')}>
                  <div className="flex items-center">
                    Item <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell cursor-pointer" onClick={() => handleSort('category')}>
                  <div className="flex items-center">
                    Category <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort('quantity')}>
                  <div className="flex items-center justify-end">
                    Quantity <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort('price')}>
                  <div className="flex items-center justify-end">
                    Price <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    No items found
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => {
                  const status = getStatus(item.quantity, item.reorderLevel);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.category || '-'}</TableCell>
                      <TableCell className="text-right">
                        <span className={`font-medium ${item.quantity < item.reorderLevel ? 'text-warning' : ''}`}>
                          {item.quantity}
                        </span>
                        <span className="text-gray-500 text-xs"> / {item.reorderLevel}</span>
                      </TableCell>
<TableCell className="text-right">₹{Number(item.price).toFixed(2)}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <StatusBadge status={status} />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryTable;
