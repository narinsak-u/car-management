import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { manufacturers } from "@/data/cars";
import type { CarStatus } from "@/types/car";

const STATUS_OPTIONS: { value: CarStatus; label: string }[] = [
  { value: "available", label: "Available" },
  { value: "maintenance", label: "Maintenance" },
  { value: "in_transit", label: "In Transit" },
];

interface CarFormGeneralInfoProps {
  registrationNumber: string;
  onRegistrationNumberChange: (value: string) => void;
  manufacturer: string;
  onManufacturerChange: (value: string) => void;
  model: string;
  onModelChange: (value: string) => void;
  year: string;
  onYearChange: (value: string) => void;
  color: string;
  onColorChange: (value: string) => void;
  status: CarStatus;
  onStatusChange: (value: CarStatus) => void;
}

export function CarFormGeneralInfo({
  registrationNumber,
  onRegistrationNumberChange,
  manufacturer,
  onManufacturerChange,
  model,
  onModelChange,
  year,
  onYearChange,
  color,
  onColorChange,
  status,
  onStatusChange,
}: CarFormGeneralInfoProps) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-6">
        General Information
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="registration">Registration Number</Label>
          <Input
            id="registration"
            placeholder="e.g. ABC-1234"
            value={registrationNumber}
            onChange={(e) => onRegistrationNumberChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Manufacturer</Label>
          <Select
            value={manufacturer}
            onValueChange={(value) => value && onManufacturerChange(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {manufacturers.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            placeholder="e.g. Model 3"
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="year">Manufacture Year</Label>
          <Input
            id="year"
            type="number"
            min="1900"
            max="2099"
            value={year}
            onChange={(e) => onYearChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="color">Exterior Color</Label>
          <Input
            id="color"
            placeholder="e.g. Midnight Blue"
            value={color}
            onChange={(e) => onColorChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Operational Status</Label>
          <Select
            value={status}
            onValueChange={(value) =>
              value && onStatusChange(value as CarStatus)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
