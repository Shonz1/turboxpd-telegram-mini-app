import { useState } from "react";
import { initData, useSignal } from "@telegram-apps/sdk-react";
import { AtSign, BadgeCheck, Car, CheckCircle2, Globe, Hash, RefreshCw } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

interface Vehicle {
  id: string;
  unit: string;
  plateNumber: string;
  vin: string;
  registrationEndDate: string;
  coiEndDate: string;
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
}: {
  vehicle: Vehicle;
  isActive: boolean;
  onActivate: () => void;
  onRenewRegistration: () => void;
  onRenewCoi: () => void;
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
            <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5">
              <Car className="size-3" />
              Update Info
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function initials(first?: string, last?: string) {
  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase() || "?";
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="text-muted-foreground flex items-center gap-2 text-sm">
        <Icon className="size-4" />
        {label}
      </span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

type RenewalType = "registration" | "coi";

interface RenewalState {
  vehicleId: string;
  type: RenewalType;
}

export function ProfilePage() {
  const user = useSignal(initData.user);
  const [activeVehicleId, setActiveVehicleId] = useState<string | null>(
    MOCK_VEHICLES[0]?.id ?? null,
  );
  const [vehicles, setVehicles] = useState(MOCK_VEHICLES);
  const [renewal, setRenewal] = useState<RenewalState | null>(null);

  const renewalVehicle = renewal ? vehicles.find((v) => v.id === renewal.vehicleId) : null;

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

  if (!user) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <Card>
          <CardContent className="text-muted-foreground text-sm">
            No Telegram user data is available. Open this app from inside
            Telegram to see your profile.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Profile</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              {user.photo_url ? (
                <AvatarImage src={user.photo_url} alt={user.first_name} />
              ) : null}
              <AvatarFallback className="text-lg font-semibold">
                {initials(user.first_name, user.last_name)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-1.5 text-lg">
                {user.first_name} {user.last_name}
                {user.is_premium ? (
                  <BadgeCheck className="text-primary size-4" />
                ) : null}
              </CardTitle>
              {user.username ? (
                <Badge variant="secondary">@{user.username}</Badge>
              ) : null}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator />
          <Row icon={Hash} label="User ID" value={user.id} />
          <Separator />
          <Row
            icon={AtSign}
            label="Username"
            value={user.username ? `@${user.username}` : "—"}
          />
          <Separator />
          <Row
            icon={Globe}
            label="Language"
            value={user.language_code?.toUpperCase() ?? "—"}
          />
        </CardContent>
      </Card>

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
                />
              </div>
            ))
          )}
        </CardContent>
      </Card>

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
