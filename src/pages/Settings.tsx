
import { useState } from "react";
import Header from "@/components/Dashboard/Header";
import BackButton from "@/components/Navigation/BackButton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("account");

  // Profile settings state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "user"
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    lowStockAlerts: true,
    orderUpdates: true,
    systemNotifications: false
  });

  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    language: "en",
    theme: "light",
    autoLogout: false,
    autoLogoutTime: 30,
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving profile settings
    setTimeout(() => {
      toast.success("Profile updated successfully");
    }, 500);
  };

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    // Show feedback
    toast.success(`${key} ${notificationSettings[key] ? "disabled" : "enabled"}`);
  };

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving general settings
    setTimeout(() => {
      toast.success("Settings updated successfully");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="p-4 sm:p-6 max-w-[1200px] mx-auto">
        <div className="flex flex-col mb-6">
          <BackButton to="/" className="self-start mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure your account and application preferences</p>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your account and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="general">General</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="mt-0">
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={profileForm.name} 
                        onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileForm.email} 
                        onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input 
                        id="role" 
                        value={profileForm.role} 
                        disabled
                      />
                      <p className="text-sm text-muted-foreground">Your role cannot be changed</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input 
                        id="current-password" 
                        type="password" 
                        placeholder="Enter your current password to change it" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input 
                        id="new-password" 
                        type="password" 
                        placeholder="Enter new password" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        placeholder="Confirm new password" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Email Alerts</h4>
                        <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.emailAlerts}
                        onCheckedChange={() => handleNotificationChange('emailAlerts')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Low Stock Alerts</h4>
                        <p className="text-sm text-gray-500">Get notified when items are running low</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.lowStockAlerts}
                        onCheckedChange={() => handleNotificationChange('lowStockAlerts')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Order Updates</h4>
                        <p className="text-sm text-gray-500">Notifications about order status changes</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.orderUpdates}
                        onCheckedChange={() => handleNotificationChange('orderUpdates')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">System Notifications</h4>
                        <p className="text-sm text-gray-500">Updates about system maintenance and features</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.systemNotifications}
                        onCheckedChange={() => handleNotificationChange('systemNotifications')}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="general" className="mt-0">
                <form onSubmit={handleGeneralSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <select 
                        id="language" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={generalSettings.language}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, language: e.target.value }))}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <select 
                        id="theme" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={generalSettings.theme}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, theme: e.target.value }))}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                      </select>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Auto Logout</h4>
                        <p className="text-sm text-gray-500">Automatically logout after inactivity</p>
                      </div>
                      <Switch 
                        checked={generalSettings.autoLogout}
                        onCheckedChange={() => setGeneralSettings(prev => ({ ...prev, autoLogout: !prev.autoLogout }))}
                      />
                    </div>
                    
                    {generalSettings.autoLogout && (
                      <div className="space-y-2">
                        <Label htmlFor="autoLogoutTime">Logout After (minutes)</Label>
                        <Input 
                          id="autoLogoutTime" 
                          type="number" 
                          min="5"
                          value={generalSettings.autoLogoutTime} 
                          onChange={(e) => setGeneralSettings(prev => ({ ...prev, autoLogoutTime: Number(e.target.value) }))} 
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
