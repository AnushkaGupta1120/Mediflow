
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Dashboard/Header";
import BackButton from "@/components/Navigation/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Use useEffect for navigation instead of doing it during render
  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  // If user is not admin, don't render anything while redirecting
  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="p-4 sm:p-6 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <BackButton to="/" />
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary">Admin Dashboard</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
            <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground">
                  <p>User management functionality would appear here.</p>
                  <p className="mt-2">This would include user listing, role management, and account controls.</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">Add User</Button>
                  <Button variant="outline" size="sm">Export Users</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground">
                  <p>System-wide configuration options would appear here.</p>
                  <p className="mt-2">Settings for inventory thresholds, notifications, and access controls.</p>
                </div>
                <Button className="mt-4" variant="outline" size="sm">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground">
                  <p>System activity logs would appear here.</p>
                  <p className="mt-2">Track user actions, inventory changes, and system events.</p>
                </div>
                <Button className="mt-4" variant="outline" size="sm">Export Logs</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
