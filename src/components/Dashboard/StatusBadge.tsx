
import { cn } from "@/lib/utils";

type StatusType = "available" | "low" | "critical" | "in-transit";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  available: {
    color: "bg-green-100 text-green-800 border border-green-200",
    label: "Available"
  },
  low: {
    color: "bg-amber-100 text-amber-800 border border-amber-200",
    label: "Low Stock"
  },
  critical: {
    color: "bg-red-100 text-red-800 border border-red-200",
    label: "Critical"
  },
  "in-transit": {
    color: "bg-blue-100 text-blue-800 border border-blue-200",
    label: "In Transit"
  }
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span 
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-full", 
        config.color,
        className
      )}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
