import { createClient } from '@supabase/supabase-js';

// 🔐 Load Supabase credentials from environment variables
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

// ⚠️ Validate that credentials are loaded
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Supabase credentials not found in environment variables!');
  console.error('Make sure .env.local has REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_PUBLISHABLE_KEY');
}

console.log('📡 Supabase URL:', SUPABASE_URL);
console.log('🔑 Supabase Key loaded:', SUPABASE_ANON_KEY ? '✅ Yes' : '❌ No');

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper: attempt insert and if PostgREST reports a missing column, remove it and retry
const safeInsert = async (table, payload) => {
  let attempt = { ...payload };
  const maxAttempts = Math.max(Object.keys(attempt).length, 3);
  for (let i = 0; i < maxAttempts; i++) {
    const { data, error } = await supabase.from(table).insert([attempt]);
    if (!error) return { data, error: null };

    const msg = (error && (error.message || error.error_description || error.details || '')).toString();
    const m = msg.match(/Could not find the '([^']+)' column of '([^']+)'/i);
    if (m) {
      const missing = m[1];
      console.warn(`⚠️ Schema mismatch detected: column '${missing}' not found on table '${table}'. Removing and retrying.`);
      // remove matching key from payload (try exact match and case-insensitive match)
      if (Object.prototype.hasOwnProperty.call(attempt, missing)) {
        delete attempt[missing];
      } else {
        const lc = missing.toLowerCase();
        for (const k of Object.keys(attempt)) {
          if (k.toLowerCase() === lc) { delete attempt[k]; break; }
        }
      }
      // continue retrying with reduced payload
      continue;
    }

    // If error is not a missing-column error, return it immediately
    return { data: null, error };
  }
  return { data: null, error: { message: 'Insert failed after removing unknown columns' } };
};

// ═══════════════════════════════════════════════════════════════════════════════
// USERS FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const addUserToDb = async (user) => {
  console.log("📤 Saving user to Supabase:", user.email);
  console.log("🔍 User details:", user);
  const payload = {
    uid: user.id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    mobile: user.mobile || '',
    password: user.password,
    address: user.address || '',
    state: user.state || '',
    city: user.city || ''
  };
  if (user.isAdmin !== undefined) payload.isAdmin = user.isAdmin;

  const { data, error } = await safeInsert('users', payload);
  if (error) {
    console.error('❌ Error adding user:', error.message || error);
    console.error('📋 Full error:', error);
    return null;
  }
  console.log("✅ User saved successfully");
  return data;
};

// Upsert (insert or update) a user — ensures user row exists before saving a booking
export const upsertUserToDb = async (user) => {
  console.log("🔄 Upserting user to Supabase:", user.email);
  const payload = {
    uid: user.id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    mobile: user.mobile || '',
    password: user.password || '',
    address: user.address || '',
    state: user.state || '',
    city: user.city || ''
  };
  if (user.isAdmin !== undefined) payload.isAdmin = user.isAdmin;

  const { data, error } = await supabase
    .from('users')
    .upsert([payload], { onConflict: 'uid' });
  if (error) {
    console.error('❌ Error upserting user:', error.message || error);
    return null;
  }
  console.log("✅ User upserted successfully");
  return data;
};

export const syncUsers = async () => {
  console.log("📥 Loading users from Supabase...");
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    console.error('❌ Error fetching users:', error);
    return [];
  }
  console.log(`✅ Loaded ${data.length} users`);
  return data;
};

export const deleteUserFromDb = async (userId) => {
  console.log("🗑️ Deleting user from Supabase:", userId);
  const { data, error } = await supabase.from('users')
    .delete()
    .eq('uid', userId);
  if (error) {
    console.error('❌ Error deleting user:', error);
    return null;
  }
  console.log("✅ User deleted");
  return data;
};

// ═══════════════════════════════════════════════════════════════════════════════
// BOOKINGS FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const addBookingToDb = async (booking) => {
  console.log("📤 Saving booking to Supabase:", booking.id);
  console.log("🔍 Booking details:", booking);
  const payload = {
    booking_id: booking.id,
    user_id: booking.userId,
    name: booking.name,
    mobile: booking.mobile,
    address: booking.address,
    state: booking.state,
    city: booking.city,
    service: booking.service,
    service_icon: booking.serviceIcon,
    service_color: booking.serviceColor,
    datetime: booking.datetime,
    date: booking.date,
    time: booking.time,
    meridiem: booking.meridiem,
    days: booking.days,
    status: booking.status,
    amount: booking.amount
  };
  if (booking.desc !== undefined) payload.desc = booking.desc;

  let { data, error } = await safeInsert('bookings', payload);

  // If FK violation on user_id, retry without user_id (nullable column fallback)
  if (error) {
    const msg = (error.message || error.details || '').toString();
    const isFkError = msg.includes('foreign key') || msg.includes('fk_bookings_user_id') || msg.includes('violates foreign key constraint');
    if (isFkError) {
      console.warn('⚠️ FK constraint on user_id — retrying without user_id...');
      const fallbackPayload = { ...payload };
      delete fallbackPayload.user_id;
      const retry = await safeInsert('bookings', fallbackPayload);
      data = retry.data;
      error = retry.error;
    }
  }

  if (error) {
    console.error('❌ Error adding booking:', error.message || error);
    console.error('📋 Full error:', error);
    return null;
  }
  console.log("✅ Booking saved");
  return data;
};

export const syncBookings = async () => {
  console.log("📥 Loading bookings from Supabase...");
  const { data, error } = await supabase.from('bookings').select('*');
  if (error) {
    console.error('❌ Error fetching bookings:', error);
    return [];
  }
  console.log(`✅ Loaded ${data.length} bookings`);
  return data;
};

export const updateBookingStatusInDb = async (bookingId, newStatus) => {
  console.log("🔄 Updating booking status:", bookingId, "→", newStatus);
  const { data, error } = await supabase.from('bookings')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('booking_id', bookingId);
  if (error) {
    console.error('❌ Error updating booking:', error);
    return null;
  }
  console.log("✅ Booking updated");
  return data;
};

export const deleteBookingFromDb = async (bookingId) => {
  console.log("🗑️ Deleting booking from Supabase:", bookingId);
  const { data, error } = await supabase.from('bookings')
    .delete()
    .eq('booking_id', bookingId);
  if (error) {
    console.error('❌ Error deleting booking:', error);
    return null;
  }
  console.log("✅ Booking deleted");
  return data;
};

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICES FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const addServiceToDb = async (service) => {
  console.log("📤 Saving service to Supabase:", service.name);
  const payload = {
    service_id: service.id,
    name: service.name,
    icon: service.icon,
    base: service.base,
    color: service.color
  };
  if (service.desc !== undefined) payload.desc = service.desc;

  const { data, error } = await safeInsert('services', payload);
  if (error) {
    console.error('❌ Error adding service:', error.message || error);
    return null;
  }
  console.log("✅ Service saved");
  return data;
};

export const syncServices = async () => {
  console.log("📥 Loading services from Supabase...");
  const { data, error } = await supabase.from('services').select('*');
  if (error) {
    console.error('❌ Error fetching services:', error);
    return [];
  }
  console.log(`✅ Loaded ${data.length} services`);
  return data;
};

export const deleteServiceFromDb = async (serviceId) => {
  console.log("🗑️ Deleting service from Supabase:", serviceId);
  const { data, error } = await supabase.from('services')
    .delete()
    .eq('service_id', serviceId);
  if (error) {
    console.error('❌ Error deleting service:', error);
    return null;
  }
  console.log("✅ Service deleted");
  return data;
};

// ═══════════════════════════════════════════════════════════════════════════════
// NOTIFICATIONS FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const addNotificationToDb = async (notification) => {
  console.log("📤 Saving notification to Supabase");
  const payload = {
    notif_id: notification.id,
    booking_id: notification.bookingId,
    user_id: notification.userId,
    action: notification.action,
    message: notification.message,
    read: notification.read || false
  };
  const { data, error } = await safeInsert('notifications', payload);
  if (error) {
    console.error('❌ Error adding notification:', error.message || error);
    return null;
  }
  console.log("✅ Notification saved");
  return data;
};

export const syncNotifications = async () => {
  console.log("📥 Loading notifications from Supabase...");
  const { data, error } = await supabase.from('notifications').select('*');
  if (error) {
    console.error('❌ Error fetching notifications:', error);
    return [];
  }
  console.log(`✅ Loaded ${data.length} notifications`);
  return data;
};

export const markNotificationReadInDb = async (notificationId) => {
  const { data, error } = await supabase.from('notifications')
    .update({ read: true })
    .eq('notif_id', notificationId);
  if (error) {
    console.error('❌ Error updating notification:', error);
    return null;
  }
  return data;
};

export const deleteNotificationFromDb = async (notificationId) => {
  const { data, error } = await supabase.from('notifications')
    .delete()
    .eq('notif_id', notificationId);
  if (error) {
    console.error('❌ Error deleting notification:', error);
    return null;
  }
  return data;
};
