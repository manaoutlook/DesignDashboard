import { pgTable, text, serial, integer, timestamp, numeric } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});

// Dashboard metrics table
export const dashboardMetrics = pgTable("dashboard_metrics", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  value: text("value").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  trend: text("trend"),
  trendValue: text("trend_value"),
  updatedAt: timestamp("updated_at"),
});

// Revenue data table
export const revenueData = pgTable("revenue_data", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  value: numeric("value").notNull(),
});

// Activities table
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userName: text("user_name").notNull(),
  action: text("action").notNull(),
  time: timestamp("time"),
});

// Locations table
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  locationType: text("location_type").notNull(),
  address: text("address").notNull(),
  area: text("area").notNull(),
  city: text("city").notNull(),
  region: text("region").notNull(),
});

// Cars table
export const cars = pgTable("cars", {
  vinNumber: text("vin_number").primaryKey(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  price: numeric("price").notNull(),
  quantity: integer("quantity").notNull(),
  locationId: integer("location_id").references(() => locations.id),
});

// Spare Parts table
export const spareParts = pgTable("spare_parts", {
  partNumber: text("part_number").primaryKey(),
  name: text("name").notNull(),
  manufacturer: text("manufacturer").notNull(),
  price: numeric("price").notNull(),
  quantity: integer("quantity").notNull(),
  alertThreshold: integer("alert_threshold").notNull(),
  locationId: integer("location_id").references(() => locations.id),
});

// Relations
export const locationsRelations = relations(locations, ({ many }) => ({
  cars: many(cars),
  spareParts: many(spareParts),
}));

export const carsRelations = relations(cars, ({ one }) => ({
  location: one(locations, {
    fields: [cars.locationId],
    references: [locations.id],
  }),
}));

export const sparePartsRelations = relations(spareParts, ({ one }) => ({
  location: one(locations, {
    fields: [spareParts.locationId],
    references: [locations.id],
  }),
}));

// Schema types
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertDashboardMetricSchema = createInsertSchema(dashboardMetrics);
export const selectDashboardMetricSchema = createSelectSchema(dashboardMetrics);
export const insertRevenueDataSchema = createInsertSchema(revenueData);
export const selectRevenueDataSchema = createSelectSchema(revenueData);
export const insertActivitySchema = createInsertSchema(activities);
export const selectActivitySchema = createSelectSchema(activities);
export const insertLocationSchema = createInsertSchema(locations);
export const selectLocationSchema = createSelectSchema(locations);
export const insertCarSchema = createInsertSchema(cars);
export const selectCarSchema = createSelectSchema(cars);
export const insertSparePartSchema = createInsertSchema(spareParts);
export const selectSparePartSchema = createSelectSchema(spareParts);

// Types
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertDashboardMetric = typeof dashboardMetrics.$inferInsert;
export type SelectDashboardMetric = typeof dashboardMetrics.$inferSelect;
export type InsertRevenueData = typeof revenueData.$inferInsert;
export type SelectRevenueData = typeof revenueData.$inferSelect;
export type InsertActivity = typeof activities.$inferInsert;
export type SelectActivity = typeof activities.$inferSelect;
export type InsertLocation = typeof locations.$inferInsert;
export type SelectLocation = typeof locations.$inferSelect;
export type InsertCar = typeof cars.$inferInsert;
export type SelectCar = typeof cars.$inferSelect;
export type InsertSparePart = typeof spareParts.$inferInsert;
export type SelectSparePart = typeof spareParts.$inferSelect;