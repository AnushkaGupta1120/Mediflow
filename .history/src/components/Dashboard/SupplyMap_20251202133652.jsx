
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";

interface LocationPoint {
  id: string;
  x: number;
  y: number;
  name: string;
  count: number;
  active?: boolean;
}

// Example location points for the map
const initialLocationPoints: LocationPoint[] = [
  { id: "loc1", x: 20, y: 30, name: "Operating Room A", count: 45 },
  { id: "loc2", x: 60, y: 40, name: "Emergency Dept", count: 78 },
  { id: "loc3", x: 45, y: 70, name: "ICU", count: 32 },
  { id: "loc4", x: 85, y: 25, name: "Storage Room", count: 120 },
  { id: "loc5", x: 70, y: 60, name: "Pharmacy", count: 65 },
];

const SupplyMap = () => {
  const [locationPoints, setLocationPoints] = useState(initialLocationPoints);

  // Simulate real-time updates for the map
  useEffect(() => {
    const interval = setInterval(() => {
      // Update counts and highlight a random location
      setLocationPoints(prevPoints => {
        const newPoints = [...prevPoints].map(point => ({ ...point, active: false }));
        
        // Randomly choose a location to update
        const randomIndex = Math.floor(Math.random() * newPoints.length);
        const countChange = Math.floor(Math.random() * 10) - 4; // -4 to +5
        
        newPoints[randomIndex] = {
          ...newPoints[randomIndex],
          count: Math.max(0, newPoints[randomIndex].count + countChange),
          active: true
        };
        
        return newPoints;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="col-span-1 lg:col-span-2 border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Supply Location Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px] bg-gray-50 rounded-md border border-gray-100 overflow-hidden">
          <div className="absolute top-2 right-2 bg-white p-1 rounded-md text-xs font-medium text-gray-500 shadow-sm">
            Real-time location data
          </div>
          
          {/* Hospital Map Background */}
          <div className="h-full w-full bg-white rounded-md p-4 relative">
            <div className="absolute inset-0 opacity-10">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <path 
                  d="M10,10 L90,10 L90,90 L10,90 Z" 
                  stroke="#0EA5E9" 
                  strokeWidth="0.5" 
                  fill="none" 
                />
                <path 
                  d="M30,10 L30,90" 
                  stroke="#0EA5E9" 
                  strokeWidth="0.2" 
                  fill="none" 
                  strokeDasharray="2,2"
                />
                <path 
                  d="M50,10 L50,90" 
                  stroke="#0EA5E9" 
                  strokeWidth="0.2" 
                  fill="none" 
                  strokeDasharray="2,2" 
                />
                <path 
                  d="M70,10 L70,90" 
                  stroke="#0EA5E9" 
                  strokeWidth="0.2" 
                  fill="none" 
                  strokeDasharray="2,2" 
                />
                <path 
                  d="M10,30 L90,30" 
                  stroke="#0EA5E9" 
                  strokeWidth="0.2" 
                  fill="none" 
                  strokeDasharray="2,2" 
                />
                <path 
                  d="M10,50 L90,50" 
                  stroke="#0EA5E9" 
                  strokeWidth="0.2" 
                  fill="none" 
                  strokeDasharray="2,2" 
                />
                <path 
                  d="M10,70 L90,70" 
                  stroke="#0EA5E9" 
                  strokeWidth="0.2" 
                  fill="none" 
                  strokeDasharray="2,2" 
                />
                
                {/* Add room outlines */}
                <rect x="15" y="15" width="25" height="20" stroke="#0EA5E9" strokeWidth="0.5" fill="none" />
                <rect x="50" y="15" width="30" height="20" stroke="#0EA5E9" strokeWidth="0.5" fill="none" />
                <rect x="15" y="45" width="40" height="35" stroke="#0EA5E9" strokeWidth="0.5" fill="none" />
                <rect x="65" y="45" width="20" height="25" stroke="#0EA5E9" strokeWidth="0.5" fill="none" />
              </svg>
            </div>

            {locationPoints.map((point) => (
              <div 
                key={point.id}
                className={`absolute flex flex-col items-center transition-all duration-500 ${point.active ? 'scale-110' : ''}`}
                style={{ 
                  left: `${point.x}%`, 
                  top: `${point.y}%`, 
                  transform: 'translate(-50%, -50%)' 
                }}
              >
                <div className="relative">
                  <MapPin 
                    className={`h-6 w-6 ${point.active ? 'text-secondary' : 'text-primary'}`}
                    fill={point.active ? "rgba(29, 78, 137, 0.2)" : "rgba(79, 179, 167, 0.2)"}
                  />
                  <div className="absolute inset-0 flex items-center justify-center mt-[-2px]">
                    <span className={`text-[10px] font-semibold ${point.active ? 'text-white' : 'text-white'}`}>
                      {point.count > 99 ? '99+' : point.count}
                    </span>
                  </div>
                  
                  {/* Pulse animation for active locations */}
                  {point.active && (
                    <div className="absolute inset-0 rounded-full animate-ping bg-secondary/20"></div>
                  )}
                </div>
                <span className={`text-[10px] font-medium mt-1 bg-white px-1 rounded ${point.active ? 'text-secondary' : ''}`}>
                  {point.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplyMap;
