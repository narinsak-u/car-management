import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { CarStatus } from "@/types/car";
import { mockCars } from "@/data/cars";

export function useCarForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [registrationNumber, setRegistrationNumber] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("2024");
  const [color, setColor] = useState("");
  const [status, setStatus] = useState<CarStatus>("available");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isEditing && id) {
      const car = mockCars.find((c) => c.id === id);
      if (car) {
        setRegistrationNumber(car.registrationNumber);
        setManufacturer(car.manufacturer);
        setModel(car.model);
        setYear(String(car.year));
        setColor(car.color);
        setStatus(car.status);
        setNotes(car.notes || "");
      }
    }
  }, [id, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      registrationNumber,
      manufacturer,
      model,
      year: Number(year),
      color,
      status,
      notes,
    });
    navigate("/cars");
  };

  return {
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
  };
}
