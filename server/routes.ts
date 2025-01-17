import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { dashboardMetrics, revenueData, activities, locations, cars, spareParts } from "@db/schema";
import { eq, desc, asc } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Dashboard metrics endpoint
  app.get("/api/metrics", async (_req, res) => {
    try {
      const metrics = await db.query.dashboardMetrics.findMany();
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
      console.error("Error fetching metrics:", error);
      res.status(500).json({ message: "Error fetching metrics", error: error instanceof Error ? error.message : String(error) });
    }
  });

  // Locations CRUD endpoints
  app.get("/api/locations", async (_req, res) => {
    try {
      const locationsList = await db.query.locations.findMany({
        with: {
          cars: true,
          spareParts: true
        }
      });
      res.json(locationsList);
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ message: "Error fetching locations", error: error instanceof Error ? error.message : String(error) });
    }
  });

  app.post("/api/locations", async (req, res) => {
    try {
      const newLocation = await db.insert(locations).values(req.body).returning();
      res.status(201).json(newLocation[0]);
    } catch (error) {
      console.error("Error creating location:", error);
      res.status(500).json({ message: "Error creating location", error: error instanceof Error ? error.message : String(error) });
    }
  });

  app.get("/api/locations/:id", async (req, res) => {
    try {
      const location = await db.query.locations.findFirst({
        where: eq(locations.id, parseInt(req.params.id)),
        with: {
          cars: true,
          spareParts: true,
        },
      });
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      res.json(location);
    } catch (error) {
      console.error("Error fetching location:", error);
      res.status(500).json({ message: "Error fetching location", error: error instanceof Error ? error.message : String(error) });
    }
  });

  // Cars CRUD endpoints
  app.get("/api/cars", async (_req, res) => {
    try {
      const carsList = await db.query.cars.findMany({
        with: {
          location: true,
        },
      });

      const formattedCars = carsList.map(car => ({
        ...car,
        price: new Intl.NumberFormat('th-TH', {
          style: 'currency',
          currency: 'THB',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(Number(car.price))
      }));

      res.json(formattedCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
      res.status(500).json({ message: "Error fetching cars", error: error instanceof Error ? error.message : String(error) });
    }
  });

  app.post("/api/cars", async (req, res) => {
    try {
      const newCar = await db.insert(cars).values(req.body).returning();
      res.status(201).json(newCar[0]);
    } catch (error) {
      console.error("Error creating car:", error);
      res.status(500).json({ message: "Error creating car", error: error instanceof Error ? error.message : String(error) });
    }
  });

  app.get("/api/cars/:id", async (req, res) => {
    try {
      const car = await db.query.cars.findFirst({
        where: eq(cars.id, parseInt(req.params.id)),
        with: {
          location: true,
        },
      });
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }

      const formattedCar = {
        ...car,
        price: new Intl.NumberFormat('th-TH', {
          style: 'currency',
          currency: 'THB',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(Number(car.price))
      };

      res.json(formattedCar);
    } catch (error) {
      console.error("Error fetching car:", error);
      res.status(500).json({ message: "Error fetching car", error: error instanceof Error ? error.message : String(error) });
    }
  });

  // Spare Parts CRUD endpoints
  app.get("/api/spare-parts", async (_req, res) => {
    try {
      const sparePartsList = await db.query.spareParts.findMany({
        with: {
          location: true,
        },
      });

      const formattedSpareParts = sparePartsList.map(part => ({
        ...part,
        price: new Intl.NumberFormat('th-TH', {
          style: 'currency',
          currency: 'THB',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(Number(part.price))
      }));

      res.json(formattedSpareParts);
    } catch (error) {
      console.error("Error fetching spare parts:", error);
      res.status(500).json({ message: "Error fetching spare parts", error: error instanceof Error ? error.message : String(error) });
    }
  });

  app.post("/api/spare-parts", async (req, res) => {
    try {
      const newSparePart = await db.insert(spareParts).values(req.body).returning();
      res.status(201).json(newSparePart[0]);
    } catch (error) {
      console.error("Error creating spare part:", error);
      res.status(500).json({ message: "Error creating spare part", error: error instanceof Error ? error.message : String(error) });
    }
  });

  app.get("/api/spare-parts/:id", async (req, res) => {
    try {
      const sparePart = await db.query.spareParts.findFirst({
        where: eq(spareParts.id, parseInt(req.params.id)),
        with: {
          location: true,
        },
      });
      if (!sparePart) {
        return res.status(404).json({ message: "Spare part not found" });
      }

      const formattedSparePart = {
        ...sparePart,
        price: new Intl.NumberFormat('th-TH', {
          style: 'currency',
          currency: 'THB',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(Number(sparePart.price))
      };

      res.json(formattedSparePart);
    } catch (error) {
      console.error("Error fetching spare part:", error);
      res.status(500).json({ message: "Error fetching spare part", error: error instanceof Error ? error.message : String(error) });
    }
  });

  // Revenue data endpoint
  app.get("/api/revenue", async (_req, res) => {
    try {
      const revenue = await db.query.revenueData.findMany({
        orderBy: [asc(revenueData.month)],
      });
      res.json(revenue);
    } catch (error) {
      console.error("Error fetching revenue:", error);
      res.status(500).json({ message: "Error fetching revenue data", error: error instanceof Error ? error.message : String(error) });
    }
  });

  // Activities endpoint
  app.get("/api/activities", async (_req, res) => {
    try {
      const recentActivities = await db.query.activities.findMany({
        orderBy: [desc(activities.time)],
        limit: 5,
      });
      res.json(recentActivities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      res.status(500).json({ message: "Error fetching activities", error: error instanceof Error ? error.message : String(error) });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}