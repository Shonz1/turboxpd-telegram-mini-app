import { useState } from "react";
import { initData, useSignal } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import {
  Car,
  CheckCircle2,
  Circle,
  Info,
  MapPin,
  CalendarClock,
  Pencil,
  PencilOff,
  Search,
  StopCircle,
  X,
  Check,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UpdateInfoModal, type VehicleInfo } from "@/components/UpdateInfoModal";

interface Vehicle {
  id: string;
  unit: string;
  plateNumber: string;
  vin: string;
  registrationEndDate: string;
  coiEndDate: string;
  serviceStatus: boolean;
  location?: string;
  availableAt?: string;
}

const MOCK_VEHICLES: Vehicle[] = [
  {
    id: "1",
    unit: "Unit 101",
    plateNumber: "ABC-1234",
    vin: "1HGCM82633A123456",
    registrationEndDate: "2025-03-15",
    coiEndDate: "2025-06-30",
    serviceStatus: true,
    location: "123 Main St, Springfield",
    availableAt: "2026-07-01T08:00",
  },
  {
    id: "2",
    unit: "Unit 205",
    plateNumber: "XYZ-5678",
    vin: "2T1BURHE0JC043821",
    registrationEndDate: "2024-11-01",
    coiEndDate: "2025-01-15",
    serviceStatus: false,
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function isExpired(dateStr: string) {
  return new Date(dateStr) < new Date();
}

function InlineDateField({
  value,
  expired,
  editMode,
  onChange,
}: {
  value: string;
  expired: boolean;
  editMode: boolean;
  onChange: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);

  if (editMode && editing) {
    return (
      <input
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        type="date"
        defaultValue={value}
        min={new Date().toISOString().split("T")[0]}
        onBlur={(e) => {
          if (e.target.value) onChange(e.target.value);
          setEditing(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
          if (e.key === "Escape") setEditing(false);
        }}
        className="rounded border bg-background px-1 py-0.5 text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
      />
    );
  }

  return (
    <span
      onClick={() => editMode && setEditing(true)}
      className={[
        expired ? "text-destructive font-medium" : "",
        editMode
          ? "cursor-pointer underline decoration-dashed underline-offset-2 hover:opacity-70"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {formatDate(value)}
    </span>
  );
}

function VehicleCard({
  vehicle,
  isActive,
  editMode,
  onActivate,
  onUpdateInfo,
  onStopService,
  onUpdateDate,
}: {
  vehicle: Vehicle;
  isActive: boolean;
  editMode: boolean;
  onActivate: () => void;
  onUpdateInfo: () => void;
  onStopService: () => void;
  onUpdateDate: (id: string, field: "registrationEndDate" | "coiEndDate", value: string) => void;
}) {
  const { t } = useTranslation();
  const regExpired = isExpired(vehicle.registrationEndDate);
  const coiExpired = isExpired(vehicle.coiEndDate);

  return (
    <div
      className={`space-y-2 py-4 rounded-lg transition-colors px-2 -mx-2 ${isActive ? "bg-secondary/50" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className={`size-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
          <span className={`font-medium ${isActive ? "text-primary" : ""}`}>{vehicle.unit}</span>
          {isActive ? (
            <Badge variant="default" className="text-xs p-1">
              <CheckCircle2 className="size-3" />
            </Badge>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-primary cursor-pointer"
              onClick={onActivate}
              title={t("home.setActive")}
            >
              <Circle className="size-3" />
            </Button>
          )}
        </div>
        <Badge variant="outline">{vehicle.plateNumber}</Badge>
      </div>

      <div className="text-muted-foreground grid grid-cols-1 gap-1 pl-6 text-xs">
        <div className="flex justify-between">
          <span>{t("home.vin")}</span>
          <span className="font-mono">{vehicle.vin}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>{t("home.service")}</span>
          {vehicle.serviceStatus ? (
            <Check className="size-3.5 text-green-600 dark:text-green-400" />
          ) : (
            <X className="size-3.5 text-destructive" />
          )}
        </div>

        <div className="flex justify-between items-center">
          <span>{t("home.registrationEnds")}</span>
          <InlineDateField
            value={vehicle.registrationEndDate}
            expired={regExpired}
            editMode={editMode}
            onChange={(v) => onUpdateDate(vehicle.id, "registrationEndDate", v)}
          />
        </div>

        <div className="flex justify-between items-center">
          <span>{t("home.coiEnds")}</span>
          <InlineDateField
            value={vehicle.coiEndDate}
            expired={coiExpired}
            editMode={editMode}
            onChange={(v) => onUpdateDate(vehicle.id, "coiEndDate", v)}
          />
        </div>

        {vehicle.location && (
          <div className="flex justify-between gap-2">
            <span className="flex items-center gap-1 shrink-0">
              <MapPin className="size-3" />
              {t("home.location")}
            </span>
            <span className="max-w-[60%] truncate text-right">{vehicle.location}</span>
          </div>
        )}

        {vehicle.availableAt && (
          <div className="flex justify-between gap-2">
            <span className="flex items-center gap-1 shrink-0">
              <CalendarClock className="size-3" />
              {t("home.availableFrom")}
            </span>
            <span>
              {new Date(vehicle.availableAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        )}
      </div>

      {isActive && !editMode && (
        <div className="pl-6 pt-2" onClick={(e) => e.stopPropagation()}>
          <p className="text-muted-foreground mb-2 text-xs">{t("home.quickActions")}</p>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs gap-1.5 cursor-pointer"
              onClick={onUpdateInfo}
            >
              <Info className="size-3" />
              {t("home.service")}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="h-8 text-xs gap-1.5 cursor-pointer"
              onClick={onStopService}
            >
              <StopCircle className="size-3" />
              {t("home.stopService")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function HomePage() {
  const { t } = useTranslation();
  useSignal(initData.user);
  const [activeVehicleId, setActiveVehicleId] = useState<string | null>(
    MOCK_VEHICLES[0]?.id ?? null,
  );
  const [vehicles, setVehicles] = useState(MOCK_VEHICLES);
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [updateInfoVehicleId, setUpdateInfoVehicleId] = useState<string | null>(null);

  const query = search.trim().toLowerCase();
  const filteredVehicles = query
    ? vehicles.filter(
        (v) =>
          v.unit.toLowerCase().includes(query) ||
          v.plateNumber.toLowerCase().includes(query) ||
          v.vin.toLowerCase().includes(query),
      )
    : vehicles;

  const updateInfoVehicle = updateInfoVehicleId
    ? vehicles.find((v) => v.id === updateInfoVehicleId)
    : null;

  function handleUpdateInfoConfirm(info: VehicleInfo) {
    if (!updateInfoVehicleId) return;
    setVehicles((prev) =>
      prev.map((v) => (v.id === updateInfoVehicleId ? { ...v, ...info } : v)),
    );
    setUpdateInfoVehicleId(null);
  }

  function handleUpdateDate(
    id: string,
    field: "registrationEndDate" | "coiEndDate",
    value: string,
  ) {
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="space-y-3">
          <CardTitle className="flex items-center justify-between text-base">
            <div className="flex items-center gap-2">
              <Car className="size-4" />
              {t("home.vehicles")}
            </div>
            <Button
              size="sm"
              variant={editMode ? "default" : "ghost"}
              className="h-7 w-7 p-0 cursor-pointer"
              onClick={() => setEditMode((v) => !v)}
              title={editMode ? t("home.exitEditMode") : t("home.enterEditMode")}
            >
              {editMode ? <PencilOff className="size-3.5" /> : <Pencil className="size-3.5" />}
            </Button>
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("home.searchVehicles")}
              className="w-full rounded-md border bg-background pl-8 pr-8 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
          {editMode && (
            <p className="text-xs text-muted-foreground">
              {t("home.editModeHint")}
            </p>
          )}
        </CardHeader>
        <CardContent>
          {filteredVehicles.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {search ? t("home.noVehiclesFound") : t("home.noVehicles")}
            </p>
          ) : (
            filteredVehicles.map((vehicle, index) => (
              <div key={vehicle.id}>
                {index > 0 && <Separator />}
                <VehicleCard
                  vehicle={vehicle}
                  isActive={activeVehicleId === vehicle.id}
                  editMode={editMode}
                  onActivate={() => setActiveVehicleId(vehicle.id)}
                  onUpdateInfo={() => setUpdateInfoVehicleId(vehicle.id)}
                  onStopService={() => console.log("Stop service", vehicle.id)}
                  onUpdateDate={handleUpdateDate}
                />
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {updateInfoVehicle && (
        <UpdateInfoModal
          open={!!updateInfoVehicleId}
          onOpenChange={(open) => {
            if (!open) setUpdateInfoVehicleId(null);
          }}
          vehicleUnit={updateInfoVehicle.unit}
          onConfirm={handleUpdateInfoConfirm}
        />
      )}
    </div>
  );
}
