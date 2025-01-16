import { ThemeToggle } from "./ThemeToggle";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#1a365d] text-white">
      <div className="flex h-16 items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-[#2a4a7d]">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            </Button>
            <Separator orientation="vertical" className="h-6 bg-white/20" />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}