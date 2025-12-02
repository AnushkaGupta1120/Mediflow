
import { useState } from "react";
import Header from "@/components/Dashboard/Header";
import BackButton from "@/components/Navigation/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck, AlertCircle, Info, Truck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "alert" | "info" | "success" | "warning";
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "n1",
    title: "Low Stock Alert",
    description: "Ventilator filters inventory is below threshold (5 units remaining)",
    time: "10 minutes ago",
    type: "alert",
    read: false
  },
  {
    id: "n2",
    title: "New Shipment Arrived",
    description: "250 units of surgical masks received at Storage Room",
    time: "1 hour ago",
    type: "success",
    read: false
  },
  {
    id: "n3",
    title: "Order Status Update",
    description: "Order #38291 has been shipped and is on the way",
    time: "3 hours ago",
    type: "info",
    read: false
  },
  {
    id: "n4",
    title: "System Maintenance",
    description: "Scheduled maintenance on May 15th, 2025 from 2-4 AM",
    time: "Yesterday",
    type: "warning",
    read: true
  },
  {
    id: "n5",
    title: "Inventory Verification Complete",
    description: "Monthly inventory verification was completed successfully",
    time: "2 days ago",
    type: "success",
    read: true
  }
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "alert":
      return <AlertCircle className="h-5 w-5 text-critical" />;
    case "info":
      return <Info className="h-5 w-5 text-info" />;
    case "success":
      return <CheckCheck className="h-5 w-5 text-success" />;
    case "warning":
      return <Truck className="h-5 w-5 text-warning" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    
    setNotifications(updatedNotifications);
    toast.success("All notifications marked as read");
  };

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    
    setNotifications(updatedNotifications);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="p-4 sm:p-6 max-w-[1000px] mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <BackButton to="/" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead} className="ml-auto">
              Mark all as read
            </Button>
          )}
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent notifications</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {notifications.map((notification, index) => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 p-2 rounded-full ${!notification.read ? 'bg-primary/10' : 'bg-gray-100'}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className={`font-medium ${!notification.read ? 'text-primary' : ''}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{notification.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {notifications.length === 0 && (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
                  <p className="text-gray-500">You're all caught up!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Notifications;
