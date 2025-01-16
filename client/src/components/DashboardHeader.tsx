import { ThemeToggle } from "./ThemeToggle";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}