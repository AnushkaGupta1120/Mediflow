
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  BarChart2, 
  Box, 
  ClipboardList, 
  PlusCircle, 
  Bell, 
  Truck, 
  Settings,
  Menu,
  X,
  LogOut,
  UserCog
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, logout } = useAuth();
  
  // Define navigation based on user role
  const baseNavigation = [
    { name: "Dashboard", href: "/", icon: BarChart2 },
    { name: "Add Inventory", href: "/add-inventory", icon: PlusCircle },
    { name: "Inventory", href: "/inventory", icon: Box },
    { name: "Orders", href: "/orders", icon: Truck },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Reports", href: "/reports", icon: ClipboardList },
    { name: "Settings", href: "/settings", icon: Settings },
  ];
  
  // Add Admin page for admin users
  const navigation = user?.role === 'admin' 
    ? [...baseNavigation, { name: "Admin", href: "/admin", icon: UserCog }]
    : baseNavigation;

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') {
      return true;
    }
    return path !== '/' && currentPath.startsWith(path);
  };

  return (
    <div 
      className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && (
          <h2 className="text-xl font-bold text-secondary">MediFlow</h2>
        )}
        <Button
          variant="ghost" 
          size="icon"
          className={`${collapsed ? "mx-auto" : ""}`}
          onClick={toggleSidebar}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>
      
      <nav className="flex-1 pt-4">
        <ul className="space-y-1 px-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100"
                } ${collapsed ? "justify-center" : "justify-start"}`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        {!collapsed ? (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-sm font-medium">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout}
              className="h-8 w-8"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
