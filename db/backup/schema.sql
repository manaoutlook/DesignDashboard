-- Database Schema Backup
-- Generated on 2025-01-16

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Dashboard metrics table
CREATE TABLE IF NOT EXISTS dashboard_metrics (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  value TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  trend TEXT,
  trend_value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Revenue data table
CREATE TABLE IF NOT EXISTS revenue_data (
  id SERIAL PRIMARY KEY,
  month TEXT NOT NULL,
  value NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities table
CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  action TEXT NOT NULL,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location_type TEXT NOT NULL,
  address TEXT NOT NULL,
  area TEXT NOT NULL,
  city TEXT NOT NULL,
  region TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
  id SERIAL PRIMARY KEY,
  vin_number TEXT NOT NULL UNIQUE,
  car_photo TEXT,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL,
  location_id INTEGER REFERENCES locations(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Spare Parts table
CREATE TABLE IF NOT EXISTS spare_parts (
  id SERIAL PRIMARY KEY,
  part_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL,
  alert_threshold INTEGER NOT NULL,
  location_id INTEGER REFERENCES locations(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
