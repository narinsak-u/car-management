import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CarFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function CarFilters({ search, onSearchChange }: CarFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Filter vehicles..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Filter data-icon="inline-start" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <ArrowUpDown data-icon="inline-start" />
          Sort
        </Button>
      </div>
    </div>
  );
}
