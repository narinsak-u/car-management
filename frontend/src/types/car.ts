export type CarStatus = "available" | "maintenance" | "in_transit"

export interface Car {
  id: string
  registrationNumber: string
  manufacturer: string
  model: string
  year: number
  color: string
  status: CarStatus
  imageUrl?: string
  notes?: string
  createdAt: string
}

export type CarFormData = Omit<Car, "id" | "createdAt">
