import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { Check, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { mockCars, manufacturers } from "@/data/cars"
import type { CarStatus } from "@/types/car"
import { cn } from "@/lib/utils"

export function AddCarPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [registrationNumber, setRegistrationNumber] = useState("")
  const [manufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("2024")
  const [color, setColor] = useState("")
  const [status, setStatus] = useState<CarStatus>("available")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (isEditing && id) {
      const car = mockCars.find((c) => c.id === id)
      if (car) {
        setRegistrationNumber(car.registrationNumber)
        setManufacturer(car.manufacturer)
        setModel(car.model)
        setYear(String(car.year))
        setColor(car.color)
        setStatus(car.status)
        setNotes(car.notes || "")
      }
    }
  }, [id, isEditing])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      registrationNumber,
      manufacturer,
      model,
      year: Number(year),
      color,
      status,
      notes,
    })
    navigate("/cars")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            FLEET <span className="mx-1">/</span>{" "}
            {isEditing ? "EDIT CAR" : "ADD CAR"}
          </p>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEditing ? "Edit Vehicle" : "New Vehicle Entry"}
          </h1>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <Button variant="outline" render={<Link to="/cars" />}>
            <X data-icon="inline-start" />
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Check data-icon="inline-start" />
            {isEditing ? "Update Entry" : "Complete Entry"}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Manufacturer</Label>
                  <Select
                    value={manufacturer}
                    onValueChange={(value) => setManufacturer(value ?? "")}
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
                    onChange={(e) => setModel(e.target.value)}
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
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="color">Exterior Color</Label>
                  <Input
                    id="color"
                    placeholder="e.g. Midnight Blue"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Operational Status</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={status === "available" ? "default" : "outline"}
                      className={cn(
                        "flex-1",
                        status === "available" &&
                          "bg-emerald-600 hover:bg-emerald-700 text-white"
                      )}
                      onClick={() => setStatus("available")}
                    >
                      <Check data-icon="inline-start" />
                      Active
                    </Button>
                    <Button
                      type="button"
                      variant={status === "maintenance" ? "default" : "outline"}
                      className={cn(
                        "flex-1",
                        status === "maintenance" &&
                          "bg-rose-600 hover:bg-rose-700 text-white"
                      )}
                      onClick={() => setStatus("maintenance")}
                    >
                      <X data-icon="inline-start" />
                      Inactive
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-6">
                Asset Documentation
              </p>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <Upload className="mx-auto size-10 text-muted-foreground mb-3" />
                <p className="font-medium">
                  Click to upload vehicle photography
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  High resolution PNG or JPG (Max 10MB)
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <Label htmlFor="notes" className="text-base font-medium">
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about this vehicle..."
                className="mt-2"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
