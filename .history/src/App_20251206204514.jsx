import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { AuthProvider } from '@/contexts/AuthContext';  // IMPORTANT

import Dashboard from './pages/Dashboard';
import AddInventory from './pages/AddInventory';
import Inventory from './pages/Inventory';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';
import Orders from './pages/Orders';
import Notifications from './pages/Notifications';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

export default function App() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen 
        bg-[hsl(var(--background))] 
        text-[hsl(var(--foreground))]"
      >
        <Sidebar />

        <main className="flex-1 p-5 bg-[hsl(var(--background))]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-inventory" element={<AddInventory />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/products" element={<Products />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}
