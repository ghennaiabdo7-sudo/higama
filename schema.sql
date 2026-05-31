-- =============================================
-- Supabase Schema: مركز الحجامة والعناية الجسدية
-- Cupping & Physical Care Center
-- Run this SQL in your Supabase SQL Editor
-- =============================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====== 1. SETTINGS (إعدادات المركز) ======
CREATE TABLE settings (
  id BIGINT PRIMARY KEY DEFAULT 1,
  logo TEXT DEFAULT '',
  bio TEXT DEFAULT 'رعاية متكاملة لصحتك الجسدية بحجامة احترافية ومساج علاجي',
  working_hours TEXT DEFAULT 'السبت - الخميس 09:00 - 20:00',
  map_link TEXT DEFAULT '',
  whatsapp TEXT DEFAULT '',
  facebook TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default row
INSERT INTO settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- ====== 2. THERAPISTS (المعالجون) ======
CREATE TABLE therapists (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  commission NUMERIC DEFAULT 0,
  whatsapp TEXT DEFAULT '',
  gender TEXT DEFAULT 'ذكر',
  rating NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====== 3. EXPENSES (المصاريف الثابتة) ======
CREATE TABLE expenses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  month TEXT NOT NULL,
  year INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====== 4. INVENTORY (المخزون) ======
CREATE TABLE inventory (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  volume NUMERIC DEFAULT 0,
  cost_price NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====== 5. SERVICES (الخدمات) ======
CREATE TABLE services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT DEFAULT '',
  price NUMERIC NOT NULL DEFAULT 0,
  description TEXT DEFAULT '',
  is_cupping BOOLEAN DEFAULT FALSE,
  cup_price NUMERIC DEFAULT 0,
  inventory_mapping JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====== 6. CUSTOMERS (الزبائن) ======
CREATE TABLE customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT DEFAULT '',
  gender TEXT DEFAULT 'ذكر',
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====== 7. BOOKINGS (الحجوزات) ======
CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  customer_id TEXT REFERENCES customers(id) ON DELETE CASCADE,
  service_id TEXT REFERENCES services(id) ON DELETE SET NULL,
  therapist_id TEXT REFERENCES therapists(id) ON DELETE SET NULL,
  service_price NUMERIC DEFAULT 0,
  final_price NUMERIC DEFAULT 0,
  cups_used INTEGER DEFAULT 0,
  date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  age INTEGER DEFAULT 0,
  chronic_diseases TEXT DEFAULT NULL,
  medical_test TEXT DEFAULT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ DEFAULT NULL,
  commission_amount NUMERIC DEFAULT 0,
  material_cost NUMERIC DEFAULT 0,
  feedback JSONB DEFAULT NULL
);

-- Create index for faster booking queries
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_therapist ON bookings(therapist_id);
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);

-- ====== 8. HEALTH RECORDS (السجلات الصحية) ======
CREATE TABLE health_records (
  id TEXT PRIMARY KEY,
  customer_id TEXT REFERENCES customers(id) ON DELETE CASCADE,
  therapist_id TEXT REFERENCES therapists(id) ON DELETE SET NULL,
  date TIMESTAMPTZ DEFAULT NOW(),
  blood_sugar NUMERIC DEFAULT NULL,
  height NUMERIC DEFAULT NULL,
  weight NUMERIC DEFAULT NULL,
  oxygen NUMERIC DEFAULT NULL,
  notes TEXT DEFAULT '',
  medical_test TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_health_customer ON health_records(customer_id);

-- ====== 9. NOTIFICATIONS (الإشعارات) ======
CREATE TABLE notifications (
  id TEXT PRIMARY KEY,
  therapist_id TEXT REFERENCES therapists(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  date TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_therapist ON notifications(therapist_id);

-- ====== 10. DEDUCTIONS (الخصومات) ======
CREATE TABLE deductions (
  id TEXT PRIMARY KEY,
  therapist_id TEXT REFERENCES therapists(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL DEFAULT 0,
  reason TEXT DEFAULT '',
  date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_deductions_therapist ON deductions(therapist_id);

-- ====== Enable Row Level Security (optional) ======
-- For production, uncomment and configure policies:
-- ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE services ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE deductions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
