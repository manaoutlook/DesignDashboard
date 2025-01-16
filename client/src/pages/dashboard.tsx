import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { OverviewCard } from "@/components/dashboard/OverviewCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ActivityList } from "@/components/dashboard/ActivityList";
import { Users, DollarSign, ShoppingCart, ArrowUpRight } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1">
        <div className="grid lg:grid-cols-6">
          <DashboardSidebar />
          <div className="col-span-5 lg:col-span-5 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <OverviewCard
                  title="Total Revenue"
                  value="$45,231"
                  description="Monthly revenue"
                  icon={DollarSign}
                  trend="up"
                  trendValue="12% from last month"
                />
                <OverviewCard
                  title="Customers"
                  value="2,350"
                  description="Active users"
                  icon={Users}
                  trend="up"
                  trendValue="8% from last month"
                />
                <OverviewCard
                  title="Sales"
                  value="12,234"
                  description="Total sales"
                  icon={ShoppingCart}
                />
                <OverviewCard
                  title="Active Now"
                  value="573"
                  description="Real-time users"
                  icon={ArrowUpRight}
                />
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-7">
                <RevenueChart />
                <ActivityList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
