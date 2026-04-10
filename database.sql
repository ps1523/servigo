-- ═══════════════════════════════════════════════════════════════════════════════
-- USERS TABLE
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  uid TEXT UNIQUE NOT NULL,
  fname TEXT NOT NULL,
  lname TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  mobile TEXT,
  password TEXT,
  address TEXT,
  state TEXT,
  city TEXT,
  isAdmin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_uid ON users(uid);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ═══════════════════════════════════════════════════════════════════════════════
-- SERVICES TABLE
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS services (
  id BIGSERIAL PRIMARY KEY,
  service_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  icon TEXT,
  "desc" TEXT,
  base TEXT,
  color TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_services_service_id ON services(service_id);

-- ═══════════════════════════════════════════════════════════════════════════════
-- BOOKINGS TABLE
-- ═══════════════════════════════════════════════════════════════════════════════
-- WORKFLOW: User books service (Pending) → Admin Confirms/Rejects → User Notified 
--           Confirmed → Service completed (Done) → Notification sent
-- STATUS VALUES: 'Pending' (initial), 'Confirmed' (accepted by admin), 
--                'Done' (completed), 'Cancelled' (rejected by admin or user)
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  booking_id TEXT UNIQUE NOT NULL,
  user_id TEXT,
  name TEXT NOT NULL,
  mobile TEXT,
  address TEXT,
  state TEXT,
  city TEXT,
  service TEXT,
  service_icon TEXT,
  service_color TEXT,
  datetime TEXT,
  "date" TEXT,
  "time" TEXT,
  meridiem TEXT,
  days TEXT,
  "desc" TEXT,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Done', 'Cancelled')),
  amount DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bookings_user_id FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE SET NULL
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_booking_id ON bookings(booking_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- ═══════════════════════════════════════════════════════════════════════════════
-- NOTIFICATIONS TABLE
-- ═══════════════════════════════════════════════════════════════════════════════
-- Stores booking status update notifications sent to users
-- ACTION VALUES: 'Confirmed' (booking confirmed by admin), 
--                'Done' (booking completed), 'Cancelled' (booking rejected)
-- NOTIFICATION WORKFLOW:
-- 1. User books service → creates initial booking (Pending)
-- 2. Admin confirms → notification created with action='Confirmed'
-- 3. User marks read → read field updated
-- 4. When service done → notification created with action='Done'
-- 5. User can delete notification
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  notif_id TEXT UNIQUE NOT NULL,
  booking_id TEXT,
  user_id TEXT,
  action TEXT NOT NULL,
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notifications_user_id FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE SET NULL,
  CONSTRAINT fk_notifications_booking_id FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE SET NULL
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_notifications_notif_id ON notifications(notif_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_booking_id ON notifications(booking_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

-- ═══════════════════════════════════════════════════════════════════════════════
-- ENABLE ROW LEVEL SECURITY (RLS POLICIES FOR ANONYMOUS ACCESS)
-- ═══════════════════════════════════════════════════════════════════════════════
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- DROP EXISTING POLICIES (if any)
DROP POLICY IF EXISTS "Allow anonymous to insert users" ON users;
DROP POLICY IF EXISTS "Allow anonymous to select users" ON users;
DROP POLICY IF EXISTS "Allow users to update their own record" ON users;
DROP POLICY IF EXISTS "Allow anonymous to delete users" ON users;

DROP POLICY IF EXISTS "Allow anonymous to insert bookings" ON bookings;
DROP POLICY IF EXISTS "Allow anonymous to select bookings" ON bookings;
DROP POLICY IF EXISTS "Allow anonymous to update bookings" ON bookings;
DROP POLICY IF EXISTS "Allow anonymous to delete bookings" ON bookings;

DROP POLICY IF EXISTS "Allow anonymous to insert services" ON services;
DROP POLICY IF EXISTS "Allow anonymous to select services" ON services;
DROP POLICY IF EXISTS "Allow anonymous to update services" ON services;
DROP POLICY IF EXISTS "Allow anonymous to delete services" ON services;

DROP POLICY IF EXISTS "Allow anonymous to insert notifications" ON notifications;
DROP POLICY IF EXISTS "Allow anonymous to select notifications" ON notifications;
DROP POLICY IF EXISTS "Allow anonymous to update notifications" ON notifications;
DROP POLICY IF EXISTS "Allow anonymous to delete notifications" ON notifications;

-- USERS POLICIES
CREATE POLICY "Allow anonymous to insert users" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous to select users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Allow users to update their own record" ON users
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous to delete users" ON users
  FOR DELETE USING (true);

-- BOOKINGS POLICIES
CREATE POLICY "Allow anonymous to insert bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous to select bookings" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous to update bookings" ON bookings
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous to delete bookings" ON bookings
  FOR DELETE USING (true);

-- SERVICES POLICIES
CREATE POLICY "Allow anonymous to insert services" ON services
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous to select services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous to update services" ON services
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous to delete services" ON services
  FOR DELETE USING (true);

-- NOTIFICATIONS POLICIES
CREATE POLICY "Allow anonymous to insert notifications" ON notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous to select notifications" ON notifications
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous to update notifications" ON notifications
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous to delete notifications" ON notifications
  FOR DELETE USING (true);

-- ═══════════════════════════════════════════════════════════════════════════════
-- SAMPLE DATA (Optional - for testing)
-- ═══════════════════════════════════════════════════════════════════════════════
-- INSERT INTO services (service_id, name, icon, desc, base, color) VALUES
-- ('service_1', 'Cleaning', 'cleaning_icon', 'Professional cleaning service', '$50', '#FF6B6B'),
-- ('service_2', 'Repair', 'repair_icon', 'Professional repair service', '$75', '#4ECDC4'),
-- ('service_3', 'Plumbing', 'plumbing_icon', 'Professional plumbing service', '$60', '#45B7D1');
