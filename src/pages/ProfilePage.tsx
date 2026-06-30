import { initData, useSignal } from "@telegram-apps/sdk-react";
import { useTranslation } from "react-i18next";
import { AtSign, BadgeCheck, Globe, Hash } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

export function ProfilePage() {
  const { t } = useTranslation();
  const user = useSignal(initData.user);

  if (!user) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("profile.title")}
        </h1>
        <Card>
          <CardContent className="text-muted-foreground text-sm">
            {t("profile.noData")}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">
        {t("profile.title")}
      </h1>

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
          <Row icon={Hash} label={t("profile.userId")} value={user.id} />
          <Separator />
          <Row
            icon={AtSign}
            label={t("profile.username")}
            value={user.username ? `@${user.username}` : "—"}
          />
          <Separator />
          <Row
            icon={Globe}
            label={t("profile.language")}
            value={user.language_code?.toUpperCase() ?? "—"}
          />
        </CardContent>
      </Card>
    </div>
  );
}
