import { pgTable, text, serial, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";
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
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Revenue data table
export const revenueData = pgTable("revenue_data", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  value: numeric("value").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Activities table
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userName: text("user_name").notNull(),
  action: text("action").notNull(),
  time: timestamp("time").defaultNow(),
});

// Schema types
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertDashboardMetricSchema = createInsertSchema(dashboardMetrics);
export const selectDashboardMetricSchema = createSelectSchema(dashboardMetrics);
export const insertRevenueDataSchema = createInsertSchema(revenueData);
export const selectRevenueDataSchema = createSelectSchema(revenueData);
export const insertActivitySchema = createInsertSchema(activities);
export const selectActivitySchema = createSelectSchema(activities);

// Types
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertDashboardMetric = typeof dashboardMetrics.$inferInsert;
export type SelectDashboardMetric = typeof dashboardMetrics.$inferSelect;
export type InsertRevenueData = typeof revenueData.$inferInsert;
export type SelectRevenueData = typeof revenueData.$inferSelect;
export type InsertActivity = typeof activities.$inferInsert;
export type SelectActivity = typeof activities.$inferSelect;