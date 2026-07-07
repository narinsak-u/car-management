import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000"

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
})

api.interceptors.response.use(
  (r) => r,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.data) {
      const body = error.response.data as Record<string, unknown>
      const message = typeof body.message === "string" ? body.message : error.message
      return Promise.reject(new Error(message))
    }
    return Promise.reject(error instanceof Error ? error : new Error(String(error)))
  },
)
