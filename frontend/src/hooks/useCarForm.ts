import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCar, useCreateCar, useUpdateCar } from "@/hooks/useCars";
import type { CarStatus } from "@/types/car";

export function useCarForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const carId = isEditing ? Number(id) : undefined;

  const { data: existingCar, isLoading: loadingCar } = useCar(carId);
  const createCar = useCreateCar();
  const updateCar = useUpdateCar();

  const [registrationNumber, setRegistrationNumber] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("2024");
  const [color, setColor] = useState("");
  const [status, setStatus] = useState<CarStatus>("available");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (existingCar) {
      setRegistrationNumber(existingCar.registrationNumber);
      setManufacturer(existingCar.manufacturer);
      setModel(existingCar.model);
      setYear(String(existingCar.year));
      setColor(existingCar.color);
      setStatus(existingCar.status);
      setNotes(existingCar.notes || "");
    }
  }, [existingCar]);

  const error = createCar.error?.message ?? updateCar.error?.message ?? null;
  const saving = createCar.isPending || updateCar.isPending;

  const handleSubmit = async (e: { preventDefault?: () => void }) => {
    e.preventDefault?.();

    const data = {
      registrationNumber,
      manufacturer,
      model,
      year: Number(year),
      color,
      status,
      notes: notes || undefined,
    };

    try {
      if (isEditing && id) {
        await updateCar.mutateAsync({ id: Number(id), data });
      } else {
        await createCar.mutateAsync(data);
      }
      navigate("/cars");
    } catch {
      // Error is already displayed via createCar.error / updateCar.error
    }
  };

  return {
    isEditing,
    loading: loadingCar || saving,
    error,
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
