import { useQuery } from "@tanstack/react-query";

// API Types
export interface DashboardMetric {
  id: number;
  title: string;
  value: string;
  description: string;
  icon: string;
  trend?: "up" | "down";
  trendValue?: string;
}

export interface RevenueData {
  id: number;
  month: string;
  value: number;
}

export interface Activity {
  id: number;
  userName: string;
  action: string;
  time: string;
}

// API hooks
export const useMetrics = () => {
  return useQuery<DashboardMetric[]>({
    queryKey: ["/api/metrics"],
  });
};

export const useRevenue = () => {
  return useQuery<RevenueData[]>({
    queryKey: ["/api/revenue"],
  });
};

export const useActivities = () => {
  return useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });
};