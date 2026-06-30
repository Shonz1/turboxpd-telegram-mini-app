import { NavLink } from "react-router-dom";
import { Home, Settings, User } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

export function BottomNav() {
  const { t } = useTranslation();

  const items = [
    { to: "/", label: t("nav.home"), icon: Home, end: true },
    { to: "/profile", label: t("nav.profile"), icon: User, end: false },
    { to: "/settings", label: t("nav.settings"), icon: Settings, end: false },
  ] as const;

  return (
    <nav
      className="bg-card/95 supports-[backdrop-filter]:bg-card/80 border-t backdrop-blur"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            <Icon className="size-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
