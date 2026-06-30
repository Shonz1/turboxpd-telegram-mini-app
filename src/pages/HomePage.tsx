import { useState } from "react";
import { initData, useSignal } from "@telegram-apps/sdk-react";
import { Car, CheckCircle2, Info, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RenewalModal } from "@/components/RenewalModal";
import { UpdateInfoModal, type VehicleInfo } from "@/components/UpdateInfoModal";

interface Vehicle {
  id: string;
  unit: string;
  plateNumber: string;
  vin: string;
  registrationEndDate: string;
  coiEndDate: string;
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
  },
  {
    id: "2",
    unit: "Unit 205",
    plateNumber: "XYZ-5678",
    vin: "2T1BURHE0JC043821",
    registrationEndDate: "2024-11-01",
    coiEndDate: "2025-01-15",
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

function VehicleCard({
  vehicle,
  isActive,
  onActivate,
  onRenewRegistration,
  onRenewCoi,
  onUpdateInfo,
}: {
  vehicle: Vehicle;
  isActive: boolean;
  onActivate: () => void;
  onRenewRegistration: () => void;
  onRenewCoi: () => void;
  onUpdateInfo: () => void;
}) {
  const regExpired = isExpired(vehicle.registrationEndDate);
  const coiExpired = isExpired(vehicle.coiEndDate);

  return (
    <div
      className={`space-y-2 py-4 rounded-lg transition-colors cursor-pointer px-2 -mx-2 ${isActive ? "bg-secondary/50" : "hover:bg-secondary/20"}`}
      onClick={onActivate}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className={`size-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
          <span className={`font-medium ${isActive ? "text-primary" : ""}`}>{vehicle.unit}</span>
          {isActive && (
            <Badge variant="default" className="text-xs gap-1 py-0">
              <CheckCircle2 className="size-3" />
              Active
            </Badge>
          )}
        </div>
        <Badge variant="outline">{vehicle.plateNumber}</Badge>
      </div>
      <div className="text-muted-foreground grid grid-cols-1 gap-1 pl-6 text-xs">
        <div className="flex justify-between">
          <span>VIN</span>
          <span className="font-mono">{vehicle.vin}</span>
        </div>
        <div className="flex justify-between">
          <span>Registration Ends</span>
          <span className={regExpired ? "text-destructive font-medium" : ""}>
            {formatDate(vehicle.registrationEndDate)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>COI Ends</span>
          <span className={coiExpired ? "text-destructive font-medium" : ""}>
            {formatDate(vehicle.coiEndDate)}
          </span>
        </div>
        {vehicle.location && (
          <div className="flex justify-between">
            <span>Location</span>
            <span className="max-w-[60%] truncate text-right">{vehicle.location}</span>
          </div>
        )}
        {vehicle.availableAt && (
          <div className="flex justify-between">
            <span>Available From</span>
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
      {isActive && (
        <div className="pl-6 pt-2" onClick={(e) => e.stopPropagation()}>
          <p className="text-muted-foreground mb-2 text-xs">Quick Actions</p>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={regExpired ? "destructive" : "secondary"}
              className="h-8 text-xs gap-1.5"
              onClick={onRenewRegistration}
            >
              <RefreshCw className="size-3" />
              Renew Registration
            </Button>
            <Button
              size="sm"
              variant={coiExpired ? "destructive" : "secondary"}
              className="h-8 text-xs gap-1.5"
              onClick={onRenewCoi}
            >
              <RefreshCw className="size-3" />
              Renew COI
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs gap-1.5"
              onClick={onUpdateInfo}
            >
              <Info className="size-3" />
              Update Info
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

type RenewalType = "registration" | "coi";

interface RenewalState {
  vehicleId: string;
  type: RenewalType;
}

export function HomePage() {
  useSignal(initData.user);
  const [activeVehicleId, setActiveVehicleId] = useState<string | null>(
    MOCK_VEHICLES[0]?.id ?? null,
  );
  const [vehicles, setVehicles] = useState(MOCK_VEHICLES);
  const [renewal, setRenewal] = useState<RenewalState | null>(null);
  const [updateInfoVehicleId, setUpdateInfoVehicleId] = useState<string | null>(null);

  const renewalVehicle = renewal ? vehicles.find((v) => v.id === renewal.vehicleId) : null;
  const updateInfoVehicle = updateInfoVehicleId ? vehicles.find((v) => v.id === updateInfoVehicleId) : null;

  function handleUpdateInfoConfirm(info: VehicleInfo) {
    if (!updateInfoVehicleId) return;
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === updateInfoVehicleId ? { ...v, ...info } : v,
      ),
    );
    setUpdateInfoVehicleId(null);
  }

  function handleRenewConfirm(newDate: string) {
    if (!renewal) return;
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id !== renewal.vehicleId) return v;
        return renewal.type === "registration"
          ? { ...v, registrationEndDate: newDate }
          : { ...v, coiEndDate: newDate };
      })
    );
    setRenewal(null);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Car className="size-4" />
            Vehicles
          </CardTitle>
        </CardHeader>
        <CardContent>
          {vehicles.length === 0 ? (
            <p className="text-muted-foreground text-sm">No vehicles assigned.</p>
          ) : (
            vehicles.map((vehicle, index) => (
              <div key={vehicle.id}>
                {index > 0 && <Separator />}
                <VehicleCard
                  vehicle={vehicle}
                  isActive={activeVehicleId === vehicle.id}
                  onActivate={() => setActiveVehicleId(vehicle.id)}
                  onRenewRegistration={() =>
                    setRenewal({ vehicleId: vehicle.id, type: "registration" })
                  }
                  onRenewCoi={() =>
                    setRenewal({ vehicleId: vehicle.id, type: "coi" })
                  }
                  onUpdateInfo={() => setUpdateInfoVehicleId(vehicle.id)}
                />
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {updateInfoVehicle && (
        <UpdateInfoModal
          open={!!updateInfoVehicleId}
          onOpenChange={(open) => { if (!open) setUpdateInfoVehicleId(null); }}
          vehicleUnit={updateInfoVehicle.unit}
          onConfirm={handleUpdateInfoConfirm}
        />
      )}

      {renewalVehicle && renewal && (
        <RenewalModal
          open={!!renewal}
          onOpenChange={(open) => { if (!open) setRenewal(null); }}
          type={renewal.type}
          vehicleUnit={renewalVehicle.unit}
          currentEndDate={
            renewal.type === "registration"
              ? renewalVehicle.registrationEndDate
              : renewalVehicle.coiEndDate
          }
          onConfirm={handleRenewConfirm}
        />
      )}
    </div>
  );
}
