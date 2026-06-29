import { Link } from "react-router-dom";
import { initData, useSignal } from "@telegram-apps/sdk-react";
import { ArrowRight, Palette, Smartphone, Sparkles, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Smartphone,
    title: "Telegram-native",
    description: "Theme, viewport, back button and init data wired in.",
  },
  {
    icon: Palette,
    title: "Adaptive theming",
    description: "shadcn tokens follow the user's Telegram color scheme.",
  },
  {
    icon: Zap,
    title: "Vite + React 19",
    description: "Fast HMR dev server and an optimized production build.",
  },
];

export function HomePage() {
  const user = useSignal(initData.user);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <Badge variant="secondary" className="gap-1">
          <Sparkles className="size-3" />
          TurboXPD
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight">
          {user ? `Welcome, ${user.first_name} 👋` : "Welcome 👋"}
        </h1>
        <p className="text-muted-foreground text-sm">
          A starter Telegram Mini App built with React, the official
          telegram-apps SDK, and shadcn/ui.
        </p>
      </header>

      <div className="space-y-3">
        {features.map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="bg-secondary text-secondary-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="size-5" />
                </span>
                <div className="space-y-0.5">
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Explore your profile</p>
            <p className="text-muted-foreground text-xs">
              See the data Telegram passes to the app.
            </p>
          </div>
          <Button asChild size="sm">
            <Link to="/profile">
              Open
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
