-- Add missing optional columns if they don't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS isAdmin BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS "desc" TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS "desc" TEXT;
-- optional: add pincode if missing
ALTER TABLE users ADD COLUMN IF NOT EXISTS pincode TEXT;
