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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
} from "@/components/ui/alert-dialog";

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
  onDelete?: (car: Car) => void;
  loading?: boolean;
}

export function CarTable({ cars, onDelete, loading }: CarTableProps) {
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
        {loading ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center py-8 text-muted-foreground"
            >
              Loading...
            </TableCell>
          </TableRow>
        ) : cars.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center py-8 text-muted-foreground"
            >
              No vehicles found.
            </TableCell>
          </TableRow>
        ) : (
          cars.map((car) => (
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
                    className="cursor-pointer"
                    variant="ghost"
                    size="sm"
                    render={<Link to={`/cars/${car.id}/edit`} />}
                  >
                    <Pencil data-icon="inline-start" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive cursor-pointer hover:text-destructive"
                        >
                          <Trash2 data-icon="inline-start" />
                          Delete
                        </Button>
                      }
                    />
                    <AlertDialogPopup>
                      <AlertDialogTitle>Delete Vehicle</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete{" "}
                        <span className="font-medium text-foreground">
                          {car.registrationNumber}
                        </span>
                        ? This action cannot be undone.
                      </AlertDialogDescription>
                      <div className="mt-6 flex justify-end gap-2">
                        <AlertDialogClose
                          render={<Button variant="outline">Cancel</Button>}
                        />
                        <AlertDialogClose
                          render={
                            <Button
                              variant="destructive"
                              onClick={() => onDelete?.(car)}
                            >
                              Delete
                            </Button>
                          }
                        />
                      </div>
                    </AlertDialogPopup>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
