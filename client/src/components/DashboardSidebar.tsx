import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  MapPin,
  Car,
  Wrench,
  BarChart,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const navigation = [
  { name: "common.dashboard", href: "/", icon: LayoutDashboard },
  { name: "common.overview", href: "/analytics", icon: BarChart },
  { name: "common.locations", href: "/locations", icon: MapPin },
  { name: "common.cars", href: "/cars", icon: Car },
  { name: "common.spareParts", href: "/spare-parts", icon: Wrench },
  { name: "common.settings", href: "/settings", icon: Settings },
];

export function DashboardSidebar() {
  const [location] = useLocation();
  const { t } = useTranslation();

  return (
    <div className="hidden border-r bg-sidebar lg:block dark:bg-sidebar">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <LayoutDashboard className="h-6 w-6" />
            <span className="text-lg">{t('common.dashboard')}</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {t(item.name)}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}