import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CarFormNotesProps {
  notes: string;
  onNotesChange: (value: string) => void;
}

export function CarFormNotes({ notes, onNotesChange }: CarFormNotesProps) {
  return (
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
        onChange={(e) => onNotesChange(e.target.value)}
      />
    </div>
  );
}
