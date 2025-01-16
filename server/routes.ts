import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { dashboardMetrics, revenueData, activities } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Dashboard metrics endpoint
  app.get("/api/metrics", async (_req, res) => {
    try {
      const metrics = await db.query.dashboardMetrics.findMany();
      // Format values that represent currency
      const formattedMetrics = metrics.map(metric => ({
        ...metric,
        value: metric.title.toLowerCase().includes('revenue') || metric.title.toLowerCase().includes('sales')
          ? new Intl.NumberFormat('th-TH', {
              style: 'currency',
              currency: 'THB',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(parseFloat(metric.value.replace(/[^0-9.-]+/g, "")))
          : metric.value
      }));
      res.json(formattedMetrics);
    } catch (error) {
      res.status(500).json({ message: "Error fetching metrics" });
    }
  });

  // Revenue data endpoint
  app.get("/api/revenue", async (_req, res) => {
    try {
      const revenue = await db.query.revenueData.findMany({
        orderBy: (revenueData, { asc }) => [asc(revenueData.month)],
      });
      res.json(revenue);
    } catch (error) {
      res.status(500).json({ message: "Error fetching revenue data" });
    }
  });

  // Activities endpoint
  app.get("/api/activities", async (_req, res) => {
    try {
      const recentActivities = await db.query.activities.findMany({
        orderBy: (activities, { desc }) => [desc(activities.time)],
        limit: 5,
      });
      res.json(recentActivities);
    } catch (error) {
      res.status(500).json({ message: "Error fetching activities" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}