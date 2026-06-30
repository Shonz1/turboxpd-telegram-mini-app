import { useState } from "react";
import {
  hapticFeedback,
  miniApp,
  useLaunchParams,
  useSignal,
} from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
      <h1 className="text-2xl font-bold tracking-tight">
        {t("settings.title")}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("settings.preferences")}</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingRow
            title={t("settings.followTheme")}
            description={t("settings.colorScheme", {
              scheme: isDark ? t("settings.dark") : t("settings.light"),
            })}
            control={<Switch checked disabled aria-readonly />}
          />
          <Separator />
          <SettingRow
            title={t("settings.hapticFeedback")}
            description={t("settings.hapticFeedbackSub")}
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
            {t("settings.about")}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">
              {t("settings.appVersion")}
            </span>
            <span className="font-medium">{APP_VERSION}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">
              {t("settings.platform")}
            </span>
            <span className="font-medium">
              {launchParams.tgWebAppPlatform ?? "—"}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">
              {t("settings.telegramVersion")}
            </span>
            <span className="font-medium">
              {launchParams.tgWebAppVersion ?? "—"}
            </span>
          </div>
        </CardContent>
      </Card>

      <p className="text-muted-foreground flex items-center justify-center gap-1.5 text-xs">
        <Vibrate className="size-3" />
        {t("settings.builtWith")}
      </p>
    </div>
  );
}
