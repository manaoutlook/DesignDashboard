import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { dashboardMetrics, revenueData, activities, locations, cars, spareParts } from "@db/schema";
import { eq, desc, asc } from "drizzle-orm";
import { formatTHB } from "@/lib/utils";

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

  // Locations CRUD endpoints
  app.get("/api/locations", async (_req, res) => {
    try {
      const locationsList = await db.query.locations.findMany({
        orderBy: [desc(locations.updatedAt)],
      });
      res.json(locationsList);
    } catch (error) {
      res.status(500).json({ message: "Error fetching locations" });
    }
  });

  app.post("/api/locations", async (req, res) => {
    try {
      const newLocation = await db.insert(locations).values(req.body).returning();
      res.status(201).json(newLocation[0]);
    } catch (error) {
      res.status(500).json({ message: "Error creating location" });
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
      res.status(500).json({ message: "Error fetching location" });
    }
  });

  // Cars CRUD endpoints
  app.get("/api/cars", async (_req, res) => {
    try {
      const carsList = await db.query.cars.findMany({
        with: {
          location: true,
        },
        orderBy: [desc(cars.updatedAt)],
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
      res.status(500).json({ message: "Error fetching cars" });
    }
  });

  app.post("/api/cars", async (req, res) => {
    try {
      const newCar = await db.insert(cars).values(req.body).returning();
      res.status(201).json(newCar[0]);
    } catch (error) {
      res.status(500).json({ message: "Error creating car" });
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
      res.status(500).json({ message: "Error fetching car" });
    }
  });

  // Spare Parts CRUD endpoints
  app.get("/api/spare-parts", async (_req, res) => {
    try {
      const sparePartsList = await db.query.spareParts.findMany({
        with: {
          location: true,
        },
        orderBy: [desc(spareParts.updatedAt)],
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
      res.status(500).json({ message: "Error fetching spare parts" });
    }
  });

  app.post("/api/spare-parts", async (req, res) => {
    try {
      const newSparePart = await db.insert(spareParts).values(req.body).returning();
      res.status(201).json(newSparePart[0]);
    } catch (error) {
      res.status(500).json({ message: "Error creating spare part" });
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
      res.status(500).json({ message: "Error fetching spare part" });
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