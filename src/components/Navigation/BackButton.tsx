
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  className?: string;
}

const BackButton = ({ to, className = "" }: BackButtonProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1); // Go back one step in history if no specific route is provided
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`flex items-center gap-1 px-2 ${className}`}
      onClick={handleClick}
    >
      <ChevronLeft size={18} />
      <span>Back</span>
    </Button>
  );
};

export default BackButton;
