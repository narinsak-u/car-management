import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockCars } from "@/data/cars";
import { useCarFilter } from "@/hooks/useCarFilter";
import { CarStatsCards } from "@/components/cars/CarStatsCards";
import { CarFilters } from "@/components/cars/CarFilters";
import { CarTable } from "@/components/cars/CarTable";
import { CarPagination } from "@/components/cars/CarPagination";

export function AllCarsPage() {
  const {
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedCars,
    stats,
    showingFrom,
    showingTo,
    totalFiltered,
  } = useCarFilter(mockCars);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Car Inventory</h1>
          <p className="text-muted-foreground">
            Manage your cars inventory and current status.
          </p>
        </div>
        <Button size="lg" render={<Link to="/cars/new" />}>
          <Plus data-icon="inline-start" />
          New Vehicle
        </Button>
      </div>

      <CarStatsCards stats={stats} />

      <Card>
        <CardContent className="p-4">
          <CarFilters search={search} onSearchChange={setSearch} />

          <div className="mt-4">
            <CarTable cars={paginatedCars} />
          </div>

          <CarPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            showingFrom={showingFrom}
            showingTo={showingTo}
            totalFiltered={totalFiltered}
          />
        </CardContent>
      </Card>
    </div>
  );
}
