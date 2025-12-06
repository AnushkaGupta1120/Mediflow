export default function App() {
  return (
    <div className="flex min-h-screen 
      bg-[hsl(var(--background))] 
      text-[hsl(var(--foreground))] 
      transition-colors duration-300"
    >
      <Sidebar />
      <main className="flex-1 p-5 
        bg-[hsl(var(--background))] 
        text-[hsl(var(--foreground))]"
      >
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
  );
}
