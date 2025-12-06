
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notifications from "./pages/Notifications";
import AddInventory from "./pages/AddInventory";
import Inventory from "./pages/Inventory";
import LastOrders from "./pages/LastOrders";
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import PageWrapper from "./components/PageWrapper";
import "./App.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
              <Route path="/notifications" element={<PageWrapper><Notifications /></PageWrapper>} />
              <Route path="/add-inventory" element={<PageWrapper><AddInventory /></PageWrapper>} />
              <Route path="/inventory" element={<PageWrapper><Inventory /></PageWrapper>} />
              <Route path="/orders" element={<PageWrapper><LastOrders /></PageWrapper>} />
              <Route path="/reports" element={<PageWrapper><Reports /></PageWrapper>} />
              <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
              <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
