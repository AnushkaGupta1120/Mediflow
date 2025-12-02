
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search supplies, locations, or IDs..." 
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        size={18} 
      />
      <Input
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-10 w-full bg-white border-gray-200"
      />
    </div>
  );
};

export default SearchBar;
