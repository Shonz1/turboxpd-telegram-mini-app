import { useState } from "react";
import { MapPin, CalendarClock, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export interface VehicleInfo {
  location: string;
  availableAt: string;
}

interface UpdateInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleUnit: string;
  onConfirm: (info: VehicleInfo) => void;
}

export function UpdateInfoModal({
  open,
  onOpenChange,
  vehicleUnit,
  onConfirm,
}: UpdateInfoModalProps) {
  const [location, setLocation] = useState("");
  const [availableAt, setAvailableAt] = useState("");
  const [locating, setLocating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleCurrentLocation() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(
          `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`,
        );
        setLocating(false);
      },
      () => setLocating(false),
    );
  }

  function handleConfirm() {
    if (!location || !availableAt) return;
    setSubmitting(true);
    setTimeout(() => {
      onConfirm({ location, availableAt });
      setSubmitting(false);
      onOpenChange(false);
    }, 600);
  }

  const minDatetime = new Date().toISOString().slice(0, 16);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="size-4 text-primary" />
            </span>
            <DialogTitle>Update Vehicle Info</DialogTitle>
          </div>
          <DialogDescription>
            {vehicleUnit} — Set the vehicle's location and next availability.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="vehicle-location"
              className="flex items-center gap-1.5 text-sm font-medium"
            >
              <MapPin className="size-4 text-muted-foreground" />
              Location
            </label>
            <div className="flex gap-2">
              <input
                id="vehicle-location"
                type="text"
                placeholder="Enter address or coordinates"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={handleCurrentLocation}
                disabled={locating}
                className="shrink-0 gap-1.5"
              >
                <LocateFixed className="size-3.5" />
                {locating ? "Locating…" : "Current"}
              </Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="available-at"
              className="flex items-center gap-1.5 text-sm font-medium"
            >
              <CalendarClock className="size-4 text-muted-foreground" />
              Available From
            </label>
            <input
              id="available-at"
              type="datetime-local"
              value={availableAt}
              min={minDatetime}
              onChange={(e) => setAvailableAt(e.target.value)}
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
              disabled={!location || !availableAt || submitting}
              onClick={handleConfirm}
            >
              {submitting ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
