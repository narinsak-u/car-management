import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Car,
  CheckCircle,
  Wrench,
  Truck,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { mockCars } from "@/data/cars"
import type { CarStatus } from "@/types/car"

const statusConfig: Record<CarStatus, { label: string; className: string }> = {
  available: {
    label: "Available",
    className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  },
  maintenance: {
    label: "Maintenance",
    className: "bg-rose-100 text-rose-700 hover:bg-rose-100",
  },
  in_transit: {
    label: "In Transit",
    className: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  },
}

const ITEMS_PER_PAGE = 5

export function AllCarsPage() {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredCars = mockCars.filter(
    (car) =>
      car.registrationNumber.toLowerCase().includes(search.toLowerCase()) ||
      car.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE)
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const stats = {
    total: mockCars.length,
    active: mockCars.filter((c) => c.status === "available").length,
    maintenance: mockCars.filter((c) => c.status === "maintenance").length,
    inTransit: mockCars.filter((c) => c.status === "in_transit").length,
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Car Inventory</h1>
          <p className="text-muted-foreground">
            Manage your fleet inventory and current status.
          </p>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button variant="outline">
            <Download data-icon="inline-start" />
            Export
          </Button>
          <Button render={<Link to="/cars/new" />}>
            <Plus data-icon="inline-start" />
            New Vehicle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Car className="size-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Fleet</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
              <CheckCircle className="size-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-rose-50">
              <Wrench className="size-6 text-rose-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Maintenance</p>
              <p className="text-2xl font-bold">{stats.maintenance}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-amber-50">
              <Truck className="size-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Transit</p>
              <p className="text-2xl font-bold">{stats.inTransit}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Filter vehicles..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter data-icon="inline-start" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <ArrowUpDown data-icon="inline-start" />
                Sort
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <span className="sr-only">Select</span>
                  </TableHead>
                  <TableHead>Registration</TableHead>
                  <TableHead>Make & Model</TableHead>
                  <TableHead className="hidden sm:table-cell">Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        className="size-4 rounded border-gray-300"
                      />
                    </TableCell>
                    <TableCell>
                      <span className="font-mono font-medium">
                        {car.registrationNumber}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{car.manufacturer}</p>
                        <p className="text-sm text-muted-foreground">
                          {car.model}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {car.year}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusConfig[car.status].className}
                      >
                        {statusConfig[car.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          render={<Link to={`/cars/${car.id}/edit`} />}
                        >
                          <Pencil data-icon="inline-start" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 data-icon="inline-start" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              -{" "}
              <span className="font-medium">
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredCars.length)}
              </span>{" "}
              of <span className="font-medium">{filteredCars.length}</span>
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    text=""
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    aria-disabled={currentPage === 1}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    text=""
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    aria-disabled={currentPage === totalPages}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
