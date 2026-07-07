import { api } from "./client";
import type { Car, CarFormData } from "@/types/car";

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  manufacturer?: string;
  model?: string;
  status?: string;
  search?: string;
  sortOrder?: string;
}

export const carsApi = {
  findAll(params?: QueryParams) {
    return api
      .get<PaginatedResult<Car>>("/cars", { params })
      .then((r) => r.data);
  },

  findById(id: number) {
    return api.get<Car>(`/cars/${id}`).then((r) => r.data);
  },

  create(data: CarFormData) {
    return api.post<Car>("/cars", data).then((r) => r.data);
  },

  update(id: number, data: Partial<CarFormData>) {
    return api.patch<Car>(`/cars/${id}`, data).then((r) => r.data);
  },

  delete(id: number) {
    return api.delete<Car>(`/cars/${id}`).then((r) => r.data);
  },
};
