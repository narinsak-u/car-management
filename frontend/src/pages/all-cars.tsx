import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import type { Car } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCarFilter } from "@/hooks/useCarFilter";
import { useDeleteCar } from "@/hooks/useCars";
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
    cars,
    stats,
    loading,
    error,
    showingFrom,
    showingTo,
    totalFiltered,
    refresh,
    sortOrder,
    toggleSort,
    statusFilter,
    setStatus,
  } = useCarFilter();

  const deleteCar = useDeleteCar();

  const handleDelete = (car: Car) => {
    deleteCar.mutate(car.id, { onSuccess: () => refresh() });
  };

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      </div>
    );
  }

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
          <CarFilters
            search={search}
            onSearchChange={setSearch}
            sortOrder={sortOrder}
            onToggleSort={toggleSort}
            statusFilter={statusFilter}
            onStatusChange={setStatus}
          />

          <div className="mt-4">
            <CarTable cars={cars} onDelete={handleDelete} loading={loading} />
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
