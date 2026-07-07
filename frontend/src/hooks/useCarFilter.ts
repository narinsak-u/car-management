import { useMemo, useState } from "react";
import type { Car } from "@/types/car";

const ITEMS_PER_PAGE = 5;

export function useCarFilter(cars: Car[]) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCars = useMemo(
    () =>
      cars.filter(
        (car) =>
          car.registrationNumber.toLowerCase().includes(search.toLowerCase()) ||
          car.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
          car.model.toLowerCase().includes(search.toLowerCase()),
      ),
    [cars, search],
  );

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);

  const paginatedCars = useMemo(
    () =>
      filteredCars.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [filteredCars, currentPage],
  );

  const stats = useMemo(
    () => ({
      total: cars.length,
      active: cars.filter((c) => c.status === "available").length,
      maintenance: cars.filter((c) => c.status === "maintenance").length,
      inTransit: cars.filter((c) => c.status === "in_transit").length,
    }),
    [cars],
  );

  const showingFrom = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const showingTo = Math.min(currentPage * ITEMS_PER_PAGE, filteredCars.length);

  return {
    search,
    setSearch: (value: string) => {
      setSearch(value);
      setCurrentPage(1);
    },
    currentPage,
    setCurrentPage,
    totalPages,
    filteredCars,
    paginatedCars,
    stats,
    showingFrom,
    showingTo,
    totalFiltered: filteredCars.length,
    ITEMS_PER_PAGE,
  };
}
