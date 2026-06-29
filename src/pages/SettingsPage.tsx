import { useState } from "react";
import {
  hapticFeedback,
  miniApp,
  useLaunchParams,
  useSignal,
} from "@telegram-apps/sdk-react";
import { Info, Vibrate } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

function SettingRow({
  title,
  description,
  control,
}: {
  title: string;
  description: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="space-y-0.5">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
      {control}
    </div>
  );
}

export function SettingsPage() {
  const isDark = useSignal(miniApp.isDark);
  const launchParams = useLaunchParams();
  const [haptics, setHaptics] = useState(true);

  function toggleHaptics(next: boolean) {
    setHaptics(next);
    if (next && hapticFeedback.impactOccurred.isAvailable()) {
      hapticFeedback.impactOccurred("light");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingRow
            title="Follow Telegram theme"
            description={`Color scheme currently ${isDark ? "dark" : "light"}`}
            control={<Switch checked disabled aria-readonly />}
          />
          <Separator />
          <SettingRow
            title="Haptic feedback"
            description="Vibrate on supported interactions"
            control={
              <Switch checked={haptics} onCheckedChange={toggleHaptics} />
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="size-4" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">App version</span>
            <span className="font-medium">{APP_VERSION}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">Platform</span>
            <span className="font-medium">
              {launchParams.tgWebAppPlatform ?? "—"}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">Telegram version</span>
            <span className="font-medium">
              {launchParams.tgWebAppVersion ?? "—"}
            </span>
          </div>
        </CardContent>
      </Card>

      <p className="text-muted-foreground flex items-center justify-center gap-1.5 text-xs">
        <Vibrate className="size-3" />
        Built with React, telegram-apps SDK & shadcn/ui
      </p>
    </div>
  );
}
