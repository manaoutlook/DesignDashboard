import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { OverviewCard } from "@/components/dashboard/OverviewCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ActivityList } from "@/components/dashboard/ActivityList";
import { DataTable } from "@/components/dashboard/DataTable";
import { Users, DollarSign, ShoppingCart, ArrowUpRight } from "lucide-react";
import { useMetrics, type DashboardMetric } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "dollar-sign": DollarSign,
  "users": Users,
  "shopping-cart": ShoppingCart,
  "arrow-up-right": ArrowUpRight,
};

const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "active" as const,
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "inactive" as const,
    lastActive: "1 day ago"
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "active" as const,
    lastActive: "3 days ago"
  },
];


export default function Dashboard() {
  const { data: metrics, isLoading } = useMetrics();

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1">
        <div className="grid lg:grid-cols-6">
          <DashboardSidebar />
          <div className="col-span-5 lg:col-span-5 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {isLoading ? (
                  Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="p-4 space-y-4">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-8 w-[100px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    ))
                ) : (
                  metrics?.map((metric: DashboardMetric) => (
                    <OverviewCard
                      key={metric.id}
                      title={metric.title}
                      value={metric.value}
                      description={metric.description}
                      icon={iconMap[metric.icon] || DollarSign}
                      trend={metric.trend}
                      trendValue={metric.trendValue}
                    />
                  ))
                )}
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-7">
                <RevenueChart />
                <ActivityList />
              </div>
              <div className="mt-6">
                <DataTable data={sampleData} isLoading={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}