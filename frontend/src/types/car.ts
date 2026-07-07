export type CarStatus = "available" | "maintenance" | "in_transit"

export interface Car {
  id: number
  registrationNumber: string
  manufacturer: string
  model: string
  year: number
  color: string
  status: CarStatus
  notes?: string
  createdAt: string
  updatedAt: string
}

export type CarFormData = Omit<Car, "id" | "createdAt" | "updatedAt">
