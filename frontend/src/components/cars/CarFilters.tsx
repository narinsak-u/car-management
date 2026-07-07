import { Search, Filter, ArrowUpAZ, ArrowDownZA } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CarStatus } from "@/types/car";

interface CarFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortOrder: "asc" | "desc";
  onToggleSort: () => void;
  statusFilter: CarStatus | "all";
  onStatusChange: (status: CarStatus | "all") => void;
}

export function CarFilters({
  search,
  onSearchChange,
  sortOrder,
  onToggleSort,
  statusFilter,
  onStatusChange,
}: CarFiltersProps) {
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
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-35">
            <Filter data-icon="inline-start" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={onToggleSort}>
          {sortOrder === "desc" ? (
            <ArrowDownZA data-icon="inline-start" />
          ) : (
            <ArrowUpAZ data-icon="inline-start" />
          )}
          {sortOrder === "desc" ? "Newest" : "Oldest"}
        </Button>
      </div>
    </div>
  );
}
