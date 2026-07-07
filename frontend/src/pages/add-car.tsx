import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCarForm } from "@/hooks/useCarForm";
import { CarFormGeneralInfo } from "@/components/cars/CarFormGeneralInfo";
import { CarFormNotes } from "@/components/cars/CarFormNotes";

export function AddCarPage() {
  const {
    isEditing,
    registrationNumber,
    setRegistrationNumber,
    manufacturer,
    setManufacturer,
    model,
    setModel,
    year,
    setYear,
    color,
    setColor,
    status,
    setStatus,
    notes,
    setNotes,
    handleSubmit,
  } = useCarForm();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            CARS <span className="mx-1">/</span>{" "}
            {isEditing ? "EDIT CAR" : "ADD CAR"}
          </p>
          <h1 className="text-2xl font-bold tracking-tight mt-2">
            {isEditing ? "Edit Vehicle" : "New Vehicle Entry"}
          </h1>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button size="lg" variant="outline" render={<Link to="/cars" />}>
            <X data-icon="inline-start" />
            Cancel
          </Button>
          <Button size="lg" onClick={handleSubmit}>
            <Check data-icon="inline-start" />
            {isEditing ? "Update Entry" : "Complete Entry"}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <CarFormGeneralInfo
              registrationNumber={registrationNumber}
              onRegistrationNumberChange={setRegistrationNumber}
              manufacturer={manufacturer}
              onManufacturerChange={setManufacturer}
              model={model}
              onModelChange={setModel}
              year={year}
              onYearChange={setYear}
              color={color}
              onColorChange={setColor}
              status={status}
              onStatusChange={setStatus}
            />

            <Separator />

            <CarFormNotes notes={notes} onNotesChange={setNotes} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
