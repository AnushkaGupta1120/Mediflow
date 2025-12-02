
import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  CircleCheck, 
  ClipboardCheck, 
  ClipboardList, 
  PackagePlus 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Types for timeline activities
type ActivityType = "delivery" | "transfer" | "checkout" | "stocktake" | "restock";

interface TimelineItem {
  id: string;
  type: ActivityType;
  time: string;
  title: string;
  description: string;
  isNew?: boolean;
}

// Initial timeline data
const initialTimelineData: TimelineItem[] = [
  {
    id: "act1",
    type: "delivery",
    time: "10:42 AM",
    title: "New Shipment Arrived",
    description: "250 units of surgical masks received at Storage Room."
  },
  {
    id: "act2",
    type: "transfer",
    time: "09:37 AM",
    title: "Supplies Transferred",
    description: "32 units of syringes moved from Storage to Operating Room A."
  },
  {
    id: "act3",
    type: "checkout",
    time: "08:15 AM",
    title: "Supplies Checked Out",
    description: "12 ventilator filters checked out by Dr. Johnson."
  },
  {
    id: "act4",
    type: "stocktake",
    time: "Yesterday",
    title: "Inventory Check Completed",
    description: "Monthly inventory verification completed."
  },
  {
    id: "act5",
    type: "restock",
    time: "Yesterday",
    title: "Stock Replenished",
    description: "Emergency medicine cabinet restocked with 45 items."
  }
];

// New activities that will be added in real-time
const newActivities: TimelineItem[] = [
  {
    id: "new1",
    type: "delivery",
    time: "Just now",
    title: "Emergency Supplies Arrived",
    description: "120 units of PPE kits delivered to Emergency Room.",
    isNew: true
  },
  {
    id: "new2",
    type: "checkout",
    time: "Just now",
    title: "Critical Supplies Deployed",
    description: "8 oxygen concentrators dispatched to Ward B.",
    isNew: true
  },
  {
    id: "new3",
    type: "transfer",
    time: "Just now",
    title: "Urgent Transfer",
    description: "15 IV sets moved from Storage to ICU.",
    isNew: true
  }
];

// Icon mapping for activity types
const activityIcons = {
  delivery: <PackagePlus className="h-5 w-5 text-primary" />,
  transfer: <ArrowUpRight className="h-5 w-5 text-info" />,
  checkout: <ArrowDownRight className="h-5 w-5 text-warning" />,
  stocktake: <ClipboardList className="h-5 w-5 text-gray-500" />,
  restock: <ClipboardCheck className="h-5 w-5 text-success" />
};

const ActivityTimeline = () => {
  const [timelineData, setTimelineData] = useState<TimelineItem[]>(initialTimelineData);
  const [newItemIndex, setNewItemIndex] = useState(0);

  useEffect(() => {
    // Simulate real-time activity updates
    const interval = setInterval(() => {
      if (newItemIndex < newActivities.length) {
        // Add new activity at the beginning of the timeline
        const updatedTimeline = [
          { ...newActivities[newItemIndex], time: "Just now" },
          ...timelineData.slice(0, 4) // Keep only the first 4 items after adding new one
        ];
        
        setTimelineData(updatedTimeline);
        setNewItemIndex((prev) => prev + 1);
      }
    }, 8000); // Add new activity every 8 seconds
    
    return () => clearInterval(interval);
  }, [timelineData, newItemIndex]);

  return (
    <Card className="col-span-1 border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-secondary">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-2">
          {timelineData.map((item, index) => (
            <div key={item.id}>
              <div 
                className={`flex p-2 hover:bg-gray-50 rounded-md transition-all ${item.isNew ? 'bg-primary/5' : ''}`}
              >
                <div className="mr-3">
                  <div className={`${item.isNew ? 'bg-primary/10 animate-pulse' : 'bg-gray-100'} p-2 rounded-full`}>
                    {activityIcons[item.type]}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className={`font-medium text-sm ${item.isNew ? 'text-primary' : ''}`}>
                      {item.title}
                    </span>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                </div>
              </div>
              {index < timelineData.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;
