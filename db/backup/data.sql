-- Database Data Backup
-- Generated on 2025-01-16

-- Dashboard Metrics Data
INSERT INTO dashboard_metrics (title, value, description, icon, trend, trend_value) VALUES
('Total Revenue', '450000', 'Total revenue this month', 'dollar-sign', 'up', '+12.3%'),
('Active Users', '1205', 'Active users this month', 'users', 'up', '+5.2%'),
('Sales', '89', 'Total sales this month', 'shopping-cart', 'down', '-2.1%'),
('Growth', '23.5%', 'Month over month growth', 'arrow-up-right', 'up', '+4.3%');

-- Revenue Data
INSERT INTO revenue_data (month, value) VALUES
('Jan', 3500),
('Feb', 4200),
('Mar', 3800),
('Apr', 2780),
('May', 3900),
('Jun', 4800),
('Jul', 5200),
('Aug', 4900),
('Sep', 5600),
('Oct', 5900),
('Nov', 6300),
('Dec', 7200);

-- Activities Data
INSERT INTO activities (user_name, action, time) VALUES
('John Smith', 'Added new car inventory', CURRENT_TIMESTAMP - INTERVAL '2 hours'),
('Sarah Lee', 'Updated spare parts', CURRENT_TIMESTAMP - INTERVAL '4 hours'),
('Mike Johnson', 'Created new location', CURRENT_TIMESTAMP - INTERVAL '1 day'),
('Lisa Brown', 'Modified pricing', CURRENT_TIMESTAMP - INTERVAL '2 days'),
('Tom Wilson', 'Performed maintenance check', CURRENT_TIMESTAMP - INTERVAL '3 days');

-- Locations Data
INSERT INTO locations (name, location_type, address, area, city, region) VALUES
('Bangkok Central', 'Showroom', '123 Sukhumvit Road', 'Watthana', 'Bangkok', 'Central'),
('Chiang Mai Hub', 'Service Center', '456 Huay Kaew Road', 'Muang', 'Chiang Mai', 'North'),
('Phuket Branch', 'Showroom', '789 Thepkasattri Road', 'Muang', 'Phuket', 'South'),
('Pattaya Center', 'Service Center', '321 Beach Road', 'Bang Lamung', 'Pattaya', 'East'),
('Khon Kaen Branch', 'Showroom', '654 Mittraphap Road', 'Muang', 'Khon Kaen', 'Northeast');

-- Cars Data
INSERT INTO cars (vin_number, make, model, year, price, quantity, location_id) VALUES
('JH4DA9350MS016523', 'Toyota', 'Camry', 2024, 1200000, 3, 1),
('1HGCM82633A123456', 'Honda', 'Civic', 2024, 950000, 5, 1),
('WBAJB0C51BC532590', 'BMW', '3 Series', 2024, 2500000, 2, 1),
('WAUZZZ8K9BA123456', 'Audi', 'A4', 2024, 2300000, 2, 4),
('SAIC2024MGZS12345', 'MG', 'ZS', 2024, 850000, 4, 2);

-- Spare Parts Data
INSERT INTO spare_parts (part_number, name, manufacturer, price, quantity, alert_threshold, location_id) VALUES
('TY-OIL-001', 'Engine Oil Filter', 'Toyota', 450, 100, 20, 1),
('HD-BRK-001', 'Brake Pads', 'Honda', 1200, 50, 10, 1),
('MG-BAT-001', 'Car Battery', 'MG', 3500, 30, 5, 2),
('BMW-AIR-001', 'Air Filter', 'BMW', 890, 45, 10, 3),
('AU-CLT-001', 'Clutch Kit', 'Audi', 15000, 15, 3, 4);
