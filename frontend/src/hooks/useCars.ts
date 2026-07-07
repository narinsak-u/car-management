import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { carsApi } from "@/api/cars";
import type { QueryParams } from "@/api/cars";
import { carKeys } from "@/api/queryKeys";
import type { CarFormData } from "@/types/car";

const ITEMS_PER_PAGE = 10;

interface CarStats {
  total: number;
  active: number;
  maintenance: number;
  inTransit: number;
}

// get car list
export function useCarList(params: QueryParams) {
  return useQuery({
    queryKey: carKeys.list({ ...params, limit: ITEMS_PER_PAGE }),
    queryFn: () => carsApi.findAll({ ...params, limit: ITEMS_PER_PAGE }),
    placeholderData: (prev) => prev,
  });
}

// get car stats
export function useCarStats() {
  return useQuery({
    queryKey: carKeys.stats(),
    queryFn: async () => {
      const [all, available, maintenance, inTransit] = await Promise.all([
        carsApi.findAll({ limit: 1 }),
        carsApi.findAll({ status: "available", limit: 1 }),
        carsApi.findAll({ status: "maintenance", limit: 1 }),
        carsApi.findAll({ status: "in_transit", limit: 1 }),
      ]);

      return {
        total: all.meta.total,
        active: available.meta.total,
        maintenance: maintenance.meta.total,
        inTransit: inTransit.meta.total,
      } satisfies CarStats;
    },
    staleTime: 1000 * 60 * 1,
  });
}

// get car by id
export function useCar(id: number | undefined) {
  return useQuery({
    queryKey: carKeys.detail(id!),
    queryFn: () => carsApi.findById(id!),
    enabled: id !== undefined,
  });
}

// create car
export function useCreateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CarFormData) => carsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carKeys.all });
    },
  });
}

// update car
export function useUpdateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CarFormData> }) =>
      carsApi.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: carKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
    },
  });
}

// delete car
export function useDeleteCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => carsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carKeys.all });
    },
  });
}

export type { CarStats, QueryParams };
