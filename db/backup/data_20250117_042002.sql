\echo 'Copying data for table: activities'
DELETE FROM activities;
INSERT INTO activities (id, user_name, action, "time") SELECT quote_nullable(id::text), quote_nullable(user_name::text), quote_nullable(action::text), quote_nullable("time"::text) FROM activities;

\echo 'Copying data for table: locations'
DELETE FROM locations;
INSERT INTO locations (id, name, location_type, address, area, city, region, created_at, updated_at) SELECT quote_nullable(id::text), quote_nullable(name::text), quote_nullable(location_type::text), quote_nullable(address::text), quote_nullable(area::text), quote_nullable(city::text), quote_nullable(region::text), quote_nullable(created_at::text), quote_nullable(updated_at::text) FROM locations;

\echo 'Copying data for table: cars'
DELETE FROM cars;
INSERT INTO cars (id, vin_number, car_photo, make, model, year, price, quantity, location_id, created_at, updated_at) SELECT quote_nullable(id::text), quote_nullable(vin_number::text), quote_nullable(car_photo::text), quote_nullable(make::text), quote_nullable(model::text), quote_nullable(year::text), quote_nullable(price::text), quote_nullable(quantity::text), quote_nullable(location_id::text), quote_nullable(created_at::text), quote_nullable(updated_at::text) FROM cars;

\echo 'Copying data for table: dashboard_metrics'
DELETE FROM dashboard_metrics;
INSERT INTO dashboard_metrics (id, title, value, description, icon, trend, trend_value, updated_at) SELECT quote_nullable(id::text), quote_nullable(title::text), quote_nullable(value::text), quote_nullable(description::text), quote_nullable(icon::text), quote_nullable(trend::text), quote_nullable(trend_value::text), quote_nullable(updated_at::text) FROM dashboard_metrics;

\echo 'Copying data for table: users'
DELETE FROM users;
INSERT INTO users (id, username, password) SELECT quote_nullable(id::text), quote_nullable(username::text), quote_nullable(password::text) FROM users;

\echo 'Copying data for table: revenue_data'
DELETE FROM revenue_data;
INSERT INTO revenue_data (id, month, value, created_at) SELECT quote_nullable(id::text), quote_nullable(month::text), quote_nullable(value::text), quote_nullable(created_at::text) FROM revenue_data;

\echo 'Copying data for table: spare_parts'
DELETE FROM spare_parts;
INSERT INTO spare_parts (id, part_number, name, manufacturer, price, quantity, alert_threshold, location_id, created_at, updated_at) SELECT quote_nullable(id::text), quote_nullable(part_number::text), quote_nullable(name::text), quote_nullable(manufacturer::text), quote_nullable(price::text), quote_nullable(quantity::text), quote_nullable(alert_threshold::text), quote_nullable(location_id::text), quote_nullable(created_at::text), quote_nullable(updated_at::text) FROM spare_parts;

