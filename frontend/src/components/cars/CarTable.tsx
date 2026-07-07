import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import type { Car, CarStatus } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
};

interface CarTableProps {
  cars: Car[];
}

export function CarTable({ cars }: CarTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <span className="sr-only">Select</span>
          </TableHead>
          <TableHead>Registration</TableHead>
          <TableHead>Make & Model</TableHead>
          <TableHead className="hidden sm:table-cell">Year</TableHead>
          <TableHead className="hidden md:table-cell">Color</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cars.map((car) => (
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
                <p className="text-sm text-muted-foreground">{car.model}</p>
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">{car.year}</TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="flex items-center gap-2">
                <span
                  className="size-4 rounded-full border shrink-0"
                  style={{ backgroundColor: car.color.toLowerCase() }}
                />
                <span>{car.color}</span>
              </div>
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
  );
}
