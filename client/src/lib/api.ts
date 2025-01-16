import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

export interface Location {
  id: number;
  name: string;
  locationType: string;
  address: string;
  area: string;
  city: string;
  region: string;
  createdAt: string;
  updatedAt: string;
}

export interface Car {
  id: number;
  vinNumber: string;
  carPhoto?: string;
  make: string;
  model: string;
  year: number;
  price: string;
  quantity: number;
  locationId: number;
  location?: Location;
  createdAt: string;
  updatedAt: string;
}

export interface SparePart {
  id: number;
  partNumber: string;
  name: string;
  manufacturer: string;
  price: string;
  quantity: number;
  alertThreshold: number;
  locationId: number;
  location?: Location;
  createdAt: string;
  updatedAt: string;
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

// Location hooks
export const useLocations = () => {
  return useQuery<Location[]>({
    queryKey: ["/api/locations"],
  });
};

export const useLocation = (id: number) => {
  return useQuery<Location>({
    queryKey: ["/api/locations", id],
    enabled: !!id,
  });
};

export const useCreateLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Location, "id" | "createdAt" | "updatedAt">) => {
      const res = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/locations"] });
    },
  });
};

// Car hooks
export const useCars = () => {
  return useQuery<Car[]>({
    queryKey: ["/api/cars"],
  });
};

export const useCar = (id: number) => {
  return useQuery<Car>({
    queryKey: ["/api/cars", id],
    enabled: !!id,
  });
};

export const useCreateCar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Car, "id" | "createdAt" | "updatedAt">) => {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cars"] });
    },
  });
};

// Spare Parts hooks
export const useSpareParts = () => {
  return useQuery<SparePart[]>({
    queryKey: ["/api/spare-parts"],
  });
};

export const useSparePart = (id: number) => {
  return useQuery<SparePart>({
    queryKey: ["/api/spare-parts", id],
    enabled: !!id,
  });
};

export const useCreateSparePart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<SparePart, "id" | "createdAt" | "updatedAt">) => {
      const res = await fetch("/api/spare-parts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/spare-parts"] });
    },
  });
};