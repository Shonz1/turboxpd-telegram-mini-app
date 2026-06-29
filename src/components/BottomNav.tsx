import { NavLink } from "react-router-dom";
import { Home, Settings, User } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/profile", label: "Profile", icon: User, end: false },
  { to: "/settings", label: "Settings", icon: Settings, end: false },
] as const;

export function BottomNav() {
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
