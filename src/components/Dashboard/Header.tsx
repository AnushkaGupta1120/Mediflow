
import { useState } from "react";
import { Link } from "react-router-dom"; 
import { Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  
  // Just for demo, simulate unread notification count
  const unreadNotifications = 3;
  
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 flex justify-between items-center">
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-w-[200px] md:min-w-[300px] bg-gray-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Link to="/notifications" className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-10 h-10 relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-critical text-white rounded-full text-xs flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Button>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-full overflow-hidden h-10 w-10 p-0"
            >
              <div className="bg-primary/20 text-primary font-medium h-full w-full flex items-center justify-center text-sm">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/settings">
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={logout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
