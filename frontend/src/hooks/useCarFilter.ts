import { useState, useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCarList, useCarStats } from "@/hooks/useCars";
import { carKeys } from "@/api/queryKeys";
import type { CarStatus } from "@/types/car";

const ITEMS_PER_PAGE = 10;

export function useCarFilter() {
  const [search, setSearchRaw] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<CarStatus | "all">("all");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queryClient = useQueryClient();

  const queryParams = {
    page: currentPage,
    search: search || undefined,
    sortOrder,
    status: statusFilter !== "all" ? statusFilter : undefined,
  };

  const { data: listResult, isLoading, error } = useCarList(queryParams);
  const { data: stats } = useCarStats();

  const setSearch = useCallback((value: string) => {
    setSearchRaw(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setCurrentPage(1);
    }, 300);
  }, []);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const toggleSort = useCallback(() => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  }, []);

  const setStatus = useCallback((status: CarStatus | "all") => {
    setStatusFilter(status);
    setCurrentPage(1);
  }, []);

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: carKeys.all });
  }, [queryClient]);

  const totalFiltered = listResult?.meta.total ?? 0;
  const totalPages = listResult?.meta.totalPages ?? 0;
  const showingFrom =
    totalFiltered === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const showingTo = Math.min(currentPage * ITEMS_PER_PAGE, totalFiltered);

  return {
    search,
    setSearch,
    currentPage,
    setCurrentPage: setPage,
    totalPages,
    cars: listResult?.data ?? [],
    stats: stats ?? { total: 0, active: 0, maintenance: 0, inTransit: 0 },
    loading: isLoading,
    error: error?.message ?? null,
    showingFrom,
    showingTo,
    totalFiltered,
    ITEMS_PER_PAGE,
    refresh,
    sortOrder,
    toggleSort,
    statusFilter,
    setStatus,
  };
}
