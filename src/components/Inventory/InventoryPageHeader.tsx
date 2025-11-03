
import BackButton from "@/components/Navigation/BackButton";

interface InventoryPageHeaderProps {
  title: string;
  description: string;
  backTo: string;
}

const InventoryPageHeader = ({ title, description, backTo }: InventoryPageHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <BackButton to={backTo} />
        <h1 className="text-2xl sm:text-3xl font-bold text-secondary">{title}</h1>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default InventoryPageHeader;
