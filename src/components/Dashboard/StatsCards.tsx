
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Package, 
  Truck, 
  CircleDollarSign 
} from "lucide-react";

interface StatItem {
  title: string;
  value: string;
  description: string;
  icon: JSX.Element;
  trend: "up" | "down";
}

const initialStats: StatItem[] = [
  {
    title: "Total Inventory",
    value: "1,284",
    description: "+4.5% from last month",
    icon: <Package className="h-5 w-5 text-primary" />,
    trend: "up"
  },
  {
    title: "Low Stock Items",
    value: "24",
    description: "+2 from yesterday",
    icon: <AlertTriangle className="h-5 w-5 text-warning" />,
    trend: "up"
  },
  {
    title: "In Transit",
    value: "38",
    description: "-5 from yesterday",
    icon: <Truck className="h-5 w-5 text-info" />,
    trend: "down"
  },
  {
    title: "Inventory Value",
    value: "$283.5k",
    description: "+2.3% from last month",
    icon: <CircleDollarSign className="h-5 w-5 text-success" />,
    trend: "up"
  }
];

const StatsCards = () => {
  const [stats, setStats] = useState(initialStats);
  const [updatedCardIndex, setUpdatedCardIndex] = useState<number | null>(null);

  useEffect(() => {
    // Simulate real-time stat updates
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * stats.length);
      setUpdatedCardIndex(randomIndex);
      
      setStats(prevStats => {
        const newStats = [...prevStats];
        
        // Update the random stat
        switch (randomIndex) {
          case 0: // Total Inventory
            const inventoryChange = Math.floor(Math.random() * 20) - 5;
            const currentInventory = parseInt(newStats[0].value.replace(",", ""));
            newStats[0] = {
              ...newStats[0],
              value: (currentInventory + inventoryChange).toLocaleString(),
              description: `${inventoryChange >= 0 ? "+" : ""}${inventoryChange} items since last update`,
              trend: inventoryChange >= 0 ? "up" : "down"
            };
            break;
            
          case 1: // Low Stock Items
            const lowStockChange = Math.floor(Math.random() * 5) - 2;
            const currentLowStock = parseInt(newStats[1].value);
            newStats[1] = {
              ...newStats[1],
              value: (currentLowStock + lowStockChange).toString(),
              description: `${lowStockChange >= 0 ? "+" : ""}${lowStockChange} from yesterday`,
              trend: lowStockChange >= 0 ? "up" : "down"
            };
            break;
            
          case 2: // In Transit
            const transitChange = Math.floor(Math.random() * 6) - 3;
            const currentTransit = parseInt(newStats[2].value);
            newStats[2] = {
              ...newStats[2],
              value: (currentTransit + transitChange).toString(),
              description: `${transitChange >= 0 ? "+" : ""}${transitChange} from yesterday`,
              trend: transitChange >= 0 ? "up" : "down"
            };
            break;
            
          case 3: // Inventory Value
            const valueChange = (Math.random() * 2 - 0.5).toFixed(1);
            const currentValueStr = newStats[3].value.replace("$", "").replace("k", "");
            const currentValue = parseFloat(currentValueStr);
            const newValue = (currentValue + parseFloat(valueChange)).toFixed(1);
            newStats[3] = {
              ...newStats[3],
              value: `$${newValue}k`,
              description: `${parseFloat(valueChange) >= 0 ? "+" : ""}${valueChange}% from yesterday`,
              trend: parseFloat(valueChange) >= 0 ? "up" : "down"
            };
            break;
        }
        
        return newStats;
      });
      
      // Clear highlight after animation
      setTimeout(() => {
        setUpdatedCardIndex(null);
      }, 1000);
    }, 4000); // Update every 4 seconds
    
    return () => clearInterval(interval);
  }, [stats]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title} 
          className={`border border-gray-200 transition-all duration-300 ${index === updatedCardIndex ? 'bg-primary/5 shadow-md' : ''}`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">
              {stat.title}
            </CardTitle>
            <div className={`${index === updatedCardIndex ? 'animate-pulse' : ''}`}>
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-success mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-critical mr-1" />
              )}
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
