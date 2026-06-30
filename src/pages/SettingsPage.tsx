import {
  useLaunchParams,
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

export function SettingsPage() {
  const { t } = useTranslation();
  const launchParams = useLaunchParams();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">
        {t("settings.title")}
      </h1>

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
