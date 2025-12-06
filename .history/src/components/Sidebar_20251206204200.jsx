import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const { user, logout } = useAuth();

  const baseNavigation = [
    { name: "Dashboard", href: "/", icon: BarChart2 },
    { name: "Add Inventory", href: "/add-inventory", icon: PlusCircle },
    { name: "Inventory", href: "/inventory", icon: Box },
    { name: "Orders", href: "/orders", icon: Truck },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Reports", href: "/reports", icon: ClipboardList },
    { name: "Settings", href: "/settings", icon: Settings },
  ];
  
  const navigation = user?.role === "admin"
    ? [...baseNavigation, { name: "Admin", href: "/admin", icon: UserCog }]
    : baseNavigation;

  const toggleSidebar = () => setCollapsed(!collapsed);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

  return (
    <div
      className={`transition-all duration-300 flex flex-col h-screen 
      bg-[hsl(var(--sidebar-background))] 
      text-[hsl(var(--sidebar-foreground))] 
      border-r border-[hsl(var(--sidebar-border))] 
      ${collapsed ? "w-16" : "w-64"}`}
    >
      <div className="p-4 flex items-center justify-between border-b border-[hsl(var(--sidebar-border))]">
        {!collapsed && (
          <h2 className="text-xl font-bold text-[hsl(var(--secondary))]">MediFlow</h2>
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
                className={`flex items-center px-3 py-2 rounded-md transition-colors
                ${collapsed ? "justify-center" : "justify-start"}
                ${
                  isActive(item.href)
                    ? "bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))]"
                    : "hover:bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-foreground))]"
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-[hsl(var(--sidebar-border))]">
        {!collapsed ? (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary)/0.25)] flex items-center justify-center">
                <span className="text-[hsl(var(--primary))] text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs opacity-75">{user?.email || "user@example.com"}</p>
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
            <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary)/0.25)] flex items-center justify-center">
              <span className="text-[hsl(var(--primary))] text-sm font-medium">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
