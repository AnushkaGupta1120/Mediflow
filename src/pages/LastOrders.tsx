
import { useState } from "react";
import Header from "@/components/Dashboard/Header";
import BackButton from "@/components/Navigation/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpDown, 
  Search, 
  Calendar, 
  FileText, 
  Eye,
  Filter,
  CheckCircle,
  Clock,
  Truck
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  supplier: string;
  items: number;
  totalAmount: string;
  status: "delivered" | "in transit" | "processing" | "cancelled";
}

const initialOrders: Order[] = [
  {
    id: "o1",
    orderNumber: "ORD-2025-0549",
    date: "May 10, 2025",
    supplier: "MedTech Supplies, Inc.",
    items: 32,
    totalAmount: "$8,742.50",
    status: "delivered"
  },
  {
    id: "o2",
    orderNumber: "ORD-2025-0548",
    date: "May 8, 2025",
    supplier: "Healthcare Solutions",
    items: 18,
    totalAmount: "$3,120.75",
    status: "in transit"
  },
  {
    id: "o3",
    orderNumber: "ORD-2025-0547",
    date: "May 5, 2025",
    supplier: "MediGlobal",
    items: 45,
    totalAmount: "$12,650.00",
    status: "processing"
  },
  {
    id: "o4",
    orderNumber: "ORD-2025-0546",
    date: "May 3, 2025",
    supplier: "ProMed Supplies",
    items: 24,
    totalAmount: "$5,830.25",
    status: "delivered"
  },
  {
    id: "o5",
    orderNumber: "ORD-2025-0545",
    date: "Apr 28, 2025",
    supplier: "MedTech Supplies, Inc.",
    items: 12,
    totalAmount: "$2,150.00",
    status: "delivered"
  }
];

// Sample order details for the modal
const sampleOrderItems = [
  { name: "Surgical Masks N95", quantity: 500, unitPrice: "$0.75", total: "$375.00" },
  { name: "Examination Gloves (Box)", quantity: 100, unitPrice: "$12.50", total: "$1,250.00" },
  { name: "Disinfectant Solution (1L)", quantity: 50, unitPrice: "$8.70", total: "$435.00" },
  { name: "Digital Thermometer", quantity: 20, unitPrice: "$34.99", total: "$699.80" }
];

const getStatusBadge = (status: Order["status"]) => {
  switch (status) {
    case "delivered":
      return <Badge className="bg-success/20 text-success border-success/30">Delivered</Badge>;
    case "in transit":
      return <Badge className="bg-info/20 text-info border-info/30">In Transit</Badge>;
    case "processing":
      return <Badge className="bg-warning/20 text-warning border-warning/30">Processing</Badge>;
    case "cancelled":
      return <Badge className="bg-critical/20 text-critical border-critical/30">Cancelled</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getStatusIcon = (status: Order["status"]) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-5 w-5 text-success" />;
    case "in transit":
      return <Truck className="h-5 w-5 text-info" />;
    case "processing":
      return <Clock className="h-5 w-5 text-warning" />;
    default:
      return null;
  }
};

const LastOrders = () => {
  const [orders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="p-4 sm:p-6 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <BackButton to="/" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary mb-2">Recent Orders</h1>
            <p className="text-muted-foreground">Track and manage your medical supply orders</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search orders..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Calendar className="h-4 w-4 mr-2" />
              Filter Date
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none">
              <FileText className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-center">Items</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Total
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.supplier}</TableCell>
                    <TableCell className="text-center">{order.items}</TableCell>
                    <TableCell>{order.totalAmount}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => viewOrderDetails(order)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No orders found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      
        {/* Order Details Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle className="text-xl">Order Details</DialogTitle>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedOrder.orderNumber}</h3>
                    <p className="text-gray-500 text-sm">{selectedOrder.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedOrder.status)}
                    <span className="font-medium">
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Supplier</h4>
                  <p>{selectedOrder.supplier}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Order Items</h4>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-center">Qty</TableHead>
                          <TableHead className="text-center">Unit Price</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sampleOrderItems.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-center">{item.quantity}</TableCell>
                            <TableCell className="text-center">{item.unitPrice}</TableCell>
                            <TableCell className="text-right">{item.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order processed by: Admin User
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Subtotal: {selectedOrder.totalAmount}</p>
                    <p className="font-medium text-lg">Total: {selectedOrder.totalAmount}</p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default LastOrders;
