
import { useState } from "react";
import Header from "@/components/Dashboard/Header";
import BackButton from "@/components/Navigation/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, BarChart2, PieChart, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Reports = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("inventory");

  // Mock report data
  const inventoryReports = [
    { id: 1, name: "Monthly Inventory Summary", date: "May 1, 2025", generated: "Admin User", status: "Complete" },
    { id: 2, name: "Low Stock Alert Report", date: "April 28, 2025", generated: "System", status: "Complete" },
    { id: 3, name: "Expired Items Report", date: "April 20, 2025", generated: "Admin User", status: "Complete" },
  ];

  const orderReports = [
    { id: 4, name: "Q2 Order Summary", date: "May 5, 2025", generated: "Admin User", status: "Complete" },
    { id: 5, name: "Supplier Performance Report", date: "April 15, 2025", generated: "System", status: "Complete" },
  ];

  const usageReports = [
    { id: 6, name: "Department Usage Statistics", date: "May 3, 2025", generated: "Admin User", status: "Complete" },
    { id: 7, name: "Monthly Consumption Report", date: "April 30, 2025", generated: "System", status: "Complete" },
  ];

  // Determine reports based on active tab
  const getReports = () => {
    switch(activeTab) {
      case "inventory": return inventoryReports;
      case "orders": return orderReports;
      case "usage": return usageReports;
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="p-4 sm:p-6 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <BackButton to="/" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary mb-2">Reports</h1>
            <p className="text-muted-foreground">Access and generate reports for your medical supplies</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <Card className="col-span-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total Reports</p>
                  <h3 className="text-2xl font-bold">7</h3>
                </div>
                <FileText className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Generated This Month</p>
                  <h3 className="text-2xl font-bold">4</h3>
                </div>
                <Calendar className="h-8 w-8 text-success opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Scheduled Reports</p>
                  <h3 className="text-2xl font-bold">3</h3>
                </div>
                <BarChart2 className="h-8 w-8 text-info opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Custom Reports</p>
                  <h3 className="text-2xl font-bold">2</h3>
                </div>
                <PieChart className="h-8 w-8 text-warning opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Available Reports</CardTitle>
              <Button>
                <FileText className="mr-2 h-4 w-4" /> Generate New Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="inventory" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
                <TabsTrigger value="orders">Order Reports</TabsTrigger>
                <TabsTrigger value="usage">Usage Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Generated By</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getReports().map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.generated}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {report.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Reports;
