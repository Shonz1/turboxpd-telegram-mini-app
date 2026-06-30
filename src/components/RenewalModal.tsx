import { useState } from "react";
import { CalendarDays, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

type RenewalType = "registration" | "coi";

interface RenewalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: RenewalType;
  vehicleUnit: string;
  currentEndDate: string;
  onConfirm: (newDate: string) => void;
}

const LABELS: Record<RenewalType, { title: string; description: string }> = {
  registration: {
    title: "Renew Registration",
    description: "Set the new registration expiration date for this vehicle.",
  },
  coi: {
    title: "Renew COI",
    description:
      "Set the new Certificate of Insurance expiration date for this vehicle.",
  },
};

export function RenewalModal({
  open,
  onOpenChange,
  type,
  vehicleUnit,
  currentEndDate,
  onConfirm,
}: RenewalModalProps) {
  const [selectedDate, setSelectedDate] = useState(currentEndDate);
  const [submitting, setSubmitting] = useState(false);

  const label = LABELS[type];

  function handleConfirm() {
    if (!selectedDate) return;
    setSubmitting(true);
    // Simulate async submit
    setTimeout(() => {
      onConfirm(selectedDate);
      setSubmitting(false);
      onOpenChange(false);
    }, 600);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <RefreshCw className="size-4 text-primary" />
            </span>
            <DialogTitle>{label.title}</DialogTitle>
          </div>
          <DialogDescription>
            {vehicleUnit} — {label.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="renewal-date"
              className="flex items-center gap-1.5 text-sm font-medium"
            >
              <CalendarDays className="size-4 text-muted-foreground" />
              New Expiration Date
            </label>
            <input
              id="renewal-date"
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button variant="outline" size="sm" disabled={submitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              size="sm"
              disabled={!selectedDate || submitting}
              onClick={handleConfirm}
            >
              {submitting ? "Saving…" : "Confirm Renewal"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
