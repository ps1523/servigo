import { useState } from "react";
import { LANGUAGES, THEMES, getTheme } from "./App";

// ─── DESIGN TOKENS (from App.js) ──────────────────────────────────────────────
const G = {
  font: "'Clash Display', 'Cabinet Grotesk', system-ui, sans-serif",
  body: "'Satoshi', 'DM Sans', system-ui, sans-serif",
  bg: "#05050a",
  surface: "#0e0e18",
  card: "#141420",
  cardHover: "#1a1a2e",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(255,255,255,0.16)",
  accent: "#ff6b35",
  accentGlow: "rgba(255,107,53,0.25)",
  accentDim: "rgba(255,107,53,0.12)",
  text: "#f4f4f8",
  muted: "#6b6b88",
  success: "#22d37a",
  danger: "#ff4757",
  info: "#4a9eff",
  warn: "#ffb347",
};

// Button & Badge styles
const s = {
  btn: (variant, size) => {
    const variants = {
      primary: { bg: G.accent, color: "#000", border: 0, boxShadow: `0 4px 12px ${G.accentGlow}` },
      ghost: { bg: "transparent", color: G.text, border: `1px solid ${G.border}` },
      info: { bg: `${G.info}15`, color: G.info, border: `1px solid ${G.info}30` },
    };
    const sizes = { sm: { py: 8, px: 12, fs: 12 }, md: { py: 10, px: 16, fs: 14 } };
    const v = variants[variant] || variants.ghost, sz = sizes[size] || sizes.md;
    return { background: v.bg, color: v.color, border: v.border, padding: `${sz.py}px ${sz.px}px`, borderRadius: 8, fontSize: sz.fs, fontWeight: 600, cursor: "pointer", transition: "all .2s", ...v };
  },
  badge: (status) => {
    const map = { Pending: [G.warn, "#000"], Confirmed: [G.info, "#000"], Done: [G.success, "#000"], Cancelled: [G.danger, "#fff"] };
    const [c, tc] = map[status] || [G.muted, G.text];
    return { display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: tc, background: c };
  },
  card: () => ({ background: G.card, border: `1px solid ${G.border}`, borderRadius: 14, transition: "all .2s" }),
};

// Format date-time
const fmtDT = (dt) => {
  try {
    return new Date(dt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return dt;
  }
};

// ─── EXCEL EXPORT FUNCTION ────────────────────────────────────────────────────
const downloadAsExcel = (data, filename) => {
  let csv = "";
  if (Array.isArray(data) && data.length > 0) {
    const headers = Object.keys(data[0]);
    csv = headers.join(",") + "\n";
    data.forEach(row => {
      csv += headers.map(h => {
        const val = row[h];
        const str = typeof val === "string" ? val : JSON.stringify(val || "");
        return `"${str.replace(/"/g, '""')}"`;
      }).join(",") + "\n";
    });
  }
  
  const sheet = `<html><body><table>${csv.split("\n").map(row => 
    `<tr>${row.split(",").map(cell => `<td>${cell.replace(/"/g, "")}</td>`).join("")}</tr>`
  ).join("")}</table></body></html>`;
  
  const blob = new Blob([csv], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}_${new Date().toLocaleDateString()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

// Input component with theme support
function Input({ label, value, onChange, placeholder, required, theme = "dark" }) {
  const themeColors = getTheme(theme);
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: themeColors.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
        {label} {required && <span style={{ color: themeColors.danger }}>*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 14px",
          background: themeColors.surface,
          border: `1px solid ${themeColors.border}`,
          borderRadius: 8,
          color: themeColors.text,
          fontFamily: themeColors.body,
          fontSize: 14,
          transition: "all .2s",
          outline: "none",
          boxSizing: "border-box",
        }}
        onFocus={e => e.target.style.borderColor = themeColors.accent}
        onBlur={e => e.target.style.borderColor = themeColors.border}
      />
    </div>
  );
}

// ─── ADMIN COMPONENTS ─────────────────────────────────────────────────────────

function StatCard({ label, value, color, icon }) {
  return (
    <div style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 16, padding: "22px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{icon}</div>
      </div>
      <div style={{ fontFamily: G.font, fontSize: 32, fontWeight: 800, color }}>{value}</div>
    </div>
  );
}

function AdminOverview({ bookings, users, onView, onExportData, theme = "dark" }) {
  const themeColors = getTheme(theme);
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const avgBookingValue = bookings.length > 0 ? (totalRevenue / bookings.length).toFixed(0) : 0;
  const pending = bookings.filter(b => b.status === "Pending").length;
  const completed = bookings.filter(b => b.status === "Done").length;
  const cancelled = bookings.filter(b => b.status === "Cancelled").length;

  const serviceStats = {};
  bookings.forEach(b => {
    if (!serviceStats[b.service]) serviceStats[b.service] = { count: 0, revenue: 0 };
    serviceStats[b.service].count += 1;
    serviceStats[b.service].revenue += b.amount || 0;
  });
  const topServices = Object.entries(serviceStats).sort((a, b) => b[1].revenue - a[1].revenue).slice(0, 5);

  const slotStats = {};
  bookings.forEach(b => {
    if (b.timeSlot) slotStats[b.timeSlot] = (slotStats[b.timeSlot] || 0) + 1;
  });
  const peakSlot = Object.entries(slotStats).sort((a, b) => b[1] - a[1])[0];

  const statusTotal = pending + completed + cancelled + bookings.filter(b => b.status === "Confirmed").length;
  const getPercentage = (val) => (statusTotal > 0 ? ((val / statusTotal) * 100).toFixed(0) : 0);

  const repeatCustomers = Object.values(
    bookings.reduce((acc, b) => {
      if (!acc[b.userId]) acc[b.userId] = 0;
      acc[b.userId]++;
      return acc;
    }, {})
  ).filter(count => count > 1).length;

  const stats = [
    { label: "Total Revenue", value: "₹" + totalRevenue, color: G.accent, icon: "💰" },
    { label: "Total Bookings", value: bookings.length, color: G.info, icon: "📋" },
    { label: "Avg. Value", value: "₹" + avgBookingValue, color: "#4f46e5", icon: "📊" },
    { label: "Total Users", value: users.length, color: "#06b6d4", icon: "👥" },
  ];

  return (
    <div style={{ animation: "fadeIn .3s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: G.font, fontSize: 26, fontWeight: 800, letterSpacing: -1, marginBottom: 4 }}>Dashboard Overview</h2>
          <p style={{ color: G.muted, fontSize: 14 }}>Real-time business intelligence & analytics</p>
        </div>
        <button
          onClick={onExportData}
          style={{
            padding: "10px 16px",
            background: themeColors.accent,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            transition: "all .2s",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          onMouseEnter={e => e.target.style.opacity = "0.8"}
          onMouseLeave={e => e.target.style.opacity = "1"}
        >
          📥 Export Data
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        {stats.map(st => <StatCard key={st.label} {...st} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 24 }}>
        <div style={{ ...s.card() }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, padding: "12px 0" }}>Booking Status</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Completed", value: completed, pct: getPercentage(completed), color: G.success },
              { label: "Pending", value: pending, pct: getPercentage(pending), color: G.warn },
              { label: "Cancelled", value: cancelled, pct: getPercentage(cancelled), color: G.danger },
            ].map(item => (
              <div key={item.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                  <span style={{ fontWeight: 500 }}>{item.label}</span>
                  <span style={{ color: item.color, fontWeight: 700 }}>{item.value} ({item.pct}%)</span>
                </div>
                <div style={{ height: 6, background: G.surface, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: item.pct + "%", background: item.color, transition: "width .3s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...s.card() }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, padding: "12px 0" }}>Customer Insights</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ padding: 12, background: G.surface, borderRadius: 8, border: `1px solid ${G.border}` }}>
              <div style={{ fontSize: 12, color: G.muted, marginBottom: 4 }}>Repeat Customers</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: G.accent }}>{repeatCustomers}</div>
              <div style={{ fontSize: 11, color: G.muted, marginTop: 4 }}>{users.length > 0 ? ((repeatCustomers / users.length) * 100).toFixed(0) : 0}% of total users</div>
            </div>
            <div style={{ padding: 12, background: G.surface, borderRadius: 8, border: `1px solid ${G.border}` }}>
              <div style={{ fontSize: 12, color: G.muted, marginBottom: 4 }}>Avg Bookings/User</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#4f46e5" }}>{users.length > 0 ? (bookings.length / users.length).toFixed(1) : 0}</div>
              <div style={{ fontSize: 11, color: G.muted, marginTop: 4 }}>Total {bookings.length} bookings</div>
            </div>
          </div>
        </div>

        <div style={{ ...s.card() }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16, padding: "12px 0" }}>Performance</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ padding: 12, background: G.surface, borderRadius: 8, border: `1px solid ${G.border}` }}>
              <div style={{ fontSize: 12, color: G.muted, marginBottom: 4 }}>Peak Time Slot</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#06b6d4" }}>{peakSlot ? peakSlot[0] : "N/A"}</div>
              <div style={{ fontSize: 11, color: G.muted, marginTop: 4 }}>{peakSlot ? peakSlot[1] + " bookings" : "No data"}</div>
            </div>
            <div style={{ padding: 12, background: G.surface, borderRadius: 8, border: `1px solid ${G.border}` }}>
              <div style={{ fontSize: 12, color: G.muted, marginBottom: 4 }}>Completion Rate</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: G.success }}>{statusTotal > 0 ? ((completed / statusTotal) * 100).toFixed(0) : 0}%</div>
              <div style={{ fontSize: 11, color: G.muted, marginTop: 4 }}>{completed} completed</div>
            </div>
          </div>
        </div>
      </div>

      {topServices.length > 0 && (
        <div style={{ ...s.card(), marginBottom: 24, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${G.border}` }}>
            <h3 style={{ fontWeight: 700 }}>Top Services by Revenue</h3>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: G.surface }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase" }}>Service</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase" }}>Bookings</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase" }}>Revenue</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase" }}>Avg Value</th>
                </tr>
              </thead>
              <tbody>
                {topServices.map(([service, stats]) => (
                  <tr key={service} style={{ borderTop: `1px solid ${G.border}` }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600 }}>{service}</td>
                    <td style={{ padding: "12px 16px", textAlign: "right" }}>{stats.count}</td>
                    <td style={{ padding: "12px 16px", textAlign: "right", color: G.accent, fontWeight: 700 }}>₹{stats.revenue}</td>
                    <td style={{ padding: "12px 16px", textAlign: "right", color: G.muted }}>₹{(stats.revenue / stats.count).toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div style={{ ...s.card(), overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${G.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontWeight: 700 }}>Recent Bookings</h3>
          <button
            onClick={() => {
              const data = bookings.map(b => ({
                "Booking ID": b.id,
                "Customer": users.find(u => u.id === b.userId)?.fname + " " + users.find(u => u.id === b.userId)?.lname || "Unknown",
                "Service": b.service,
                "Date & Time": b.date + " " + b.time,
                "Days": b.duration || 1,
                "Amount": "₹" + b.amount,
                "Status": b.status,
              }));
              downloadAsExcel(data, "Bookings_" + new Date().toISOString().split("T")[0]);
            }}
            style={{
              padding: "6px 12px",
              background: themeColors.accent,
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all .2s",
            }}
            onMouseEnter={e => e.target.style.opacity = "0.8"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >
            📥 Export
          </button>
        </div>
        <BookingTable bookings={[...bookings].reverse().slice(0, 6)} onView={onView} compact theme={theme} />
      </div>
    </div>
  );
}

function BookingTable({ bookings, onView, onStatus, onDeleteBooking, compact, theme = "dark" }) {
  const themeColors = getTheme(theme);
  const statusDot = { Pending: "#ffb347", Confirmed: "#4a9eff", Done: "#22d37a", Cancelled: "#ff4757" };
  
  if (bookings.length === 0)
    return <div style={{ textAlign: "center", padding: "48px 20px", color: G.muted }}>No bookings found</div>;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: G.surface }}>
            {["ID", "Customer", "Service", "Date & Time", "Days", "Amount", "Status", "Action"].map(h => (
              <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr
              key={b.id}
              style={{ borderTop: `1px solid ${G.border}`, transition: "background .15s" }}
              onMouseEnter={e => (e.currentTarget.style.background = G.cardHover)}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <td style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: 12, color: G.muted }}>{b.id}</td>
              <td style={{ padding: "14px 16px" }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{b.name}</div>
                <div style={{ fontSize: 12, color: G.muted }}>{b.mobile}</div>
              </td>
              <td style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{b.serviceIcon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{b.service}</span>
                </div>
              </td>
              <td style={{ padding: "14px 16px", fontSize: 13, color: G.muted, whiteSpace: "nowrap" }}>
                {b.date ? `${b.date} ${b.time} ${b.meridiem}` : fmtDT(b.datetime)}
              </td>
              <td style={{ padding: "14px 16px", fontSize: 13 }}>{b.days}</td>
              <td style={{ padding: "14px 16px", fontWeight: 700, color: b.serviceColor, fontFamily: G.font, fontSize: 16 }}>₹{b.amount}</td>
              <td style={{ padding: "14px 16px" }}>
                <span style={s.badge(b.status)}>{b.status}</span>
              </td>
              <td style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button style={s.btn("info", "sm")} onClick={() => onView(b)}>
                    View
                  </button>
                  {onDeleteBooking && (
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete booking #${b.id}?`)) {
                          onDeleteBooking(b.id);
                        }
                      }}
                      style={{
                        padding: "6px 10px",
                        background: themeColors.danger || "#ff4757",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all .2s",
                      }}
                      onMouseEnter={e => e.target.style.opacity = "0.8"}
                      onMouseLeave={e => e.target.style.opacity = "1"}
                    >
                      🗑
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminBookings({ bookings, onView, onStatus, onDeleteBooking, users, theme = "dark" }) {
  const themeColors = getTheme(theme);
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div style={{ animation: "fadeIn .3s" }}>
      <h2 style={{ fontFamily: G.font, fontSize: 26, fontWeight: 800, letterSpacing: -1, marginBottom: 4 }}>All Bookings</h2>
      <p style={{ color: G.muted, fontSize: 14, marginBottom: 28 }}>Manage every service booking</p>
      <div style={{ ...s.card(), overflow: "hidden" }}>
        <div
          style={{
            padding: "18px 24px",
            borderBottom: `1px solid ${G.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <h3 style={{ fontWeight: 700 }}>Bookings ({filtered.length})</h3>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 8 }}>
              {["all", "Pending", "Confirmed", "Done", "Cancelled"].map(st => (
                <button
                  key={st}
                  onClick={() => setFilter(st)}
                  style={{
                    ...s.btn(filter === st ? "primary" : "ghost", "sm"),
                    fontFamily: G.body,
                  }}
                >
                  {st === "all" ? "All" : st}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                const data = filtered.map(b => ({
                  "ID": b.id,
                  "Customer": users?.find(u => u.id === b.userId)?.fname + " " + users?.find(u => u.id === b.userId)?.lname || "Unknown",
                  "Service": b.service,
                  "Date": b.date,
                  "Time": b.time,
                  "Days": b.duration || 1,
                  "Amount": b.amount,
                  "Status": b.status,
                }));
                downloadAsExcel(data, "Bookings_" + new Date().toISOString().split("T")[0]);
              }}
              style={{
                padding: "8px 14px",
                background: themeColors.accent,
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all .2s",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
              onMouseEnter={e => e.target.style.opacity = "0.8"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >
              📥 Export
            </button>
          </div>
        </div>
        <BookingTable bookings={[...filtered].reverse()} onView={onView} onStatus={onStatus} onDeleteBooking={onDeleteBooking} theme={theme} />
      </div>
    </div>
  );
}

function AdminUsers({ users, bookings, onDeleteUser, theme = "dark" }) {
  const themeColors = getTheme(theme);
  return (
    <div style={{ animation: "fadeIn .3s" }}>
      <h2 style={{ fontFamily: G.font, fontSize: 26, fontWeight: 800, letterSpacing: -1, marginBottom: 4 }}>Registered Users</h2>
      <p style={{ color: G.muted, fontSize: 14, marginBottom: 28 }}>All accounts on ServiGo</p>
      <div style={{ ...s.card(), overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${G.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontWeight: 700 }}>Users ({users.length})</h3>
          <button
            onClick={() => {
              const data = users.map(u => ({
                "ID": u.id,
                "First Name": u.fname,
                "Last Name": u.lname,
                "Email": u.email,
                "Mobile": u.mobile,
                "City": u.city,
                "Bookings": bookings.filter(b => b.userId === u.id).length,
                "Joined": u.joined,
              }));
              downloadAsExcel(data, "Users_" + new Date().toISOString().split("T")[0]);
            }}
            style={{
              padding: "8px 14px",
              background: themeColors.accent,
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all .2s",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
            onMouseEnter={e => e.target.style.opacity = "0.8"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >
            📥 Export
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: G.surface }}>
                {["User", "Email", "Mobile", "City", "Bookings", "Joined", "Action"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                const bc = bookings.filter(b => b.userId === u.id).length;
                return (
                  <tr
                    key={u.id}
                    style={{ borderTop: `1px solid ${G.border}` }}
                    onMouseEnter={e => (e.currentTarget.style.background = G.cardHover)}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: G.accentDim,
                            border: `1.5px solid ${G.accent}33`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            fontWeight: 700,
                            color: G.accent,
                          }}
                        >
                          {u.fname?.[0]}{u.lname?.[0]}
                        </div>
                        <div style={{ fontWeight: 600 }}>
                          {u.fname} {u.lname}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: G.muted }}>{u.email}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13 }}>{u.mobile}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: G.muted }}>{u.city}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ ...s.badge("Confirmed"), fontSize: 13 }}>{bc}</span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: G.muted }}>{u.joined}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete user ${u.fname} ${u.lname}? This will also delete their ${bc} booking(s).`)) {
                            onDeleteUser(u.id);
                          }
                        }}
                        style={{
                          padding: "6px 10px",
                          background: themeColors.danger || "#ff4757",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all .2s",
                        }}
                        onMouseEnter={e => e.target.style.opacity = "0.8"}
                        onMouseLeave={e => e.target.style.opacity = "1"}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminServices({ services, onAdd, onDelete, toast, theme = "dark" }) {
  const themeColors = getTheme(theme);
  const [f, setF] = useState({ name: "", icon: "", desc: "", base: "" });
  const set = k => v => setF(p => ({ ...p, [k]: v }));
  const COLORS = ["#ffb347", "#4a9eff", "#a78bfa", "#22d37a", "#38bdf8", "#fb7185", "#34d399", "#f472b6", "#86efac", "#fbbf24"];

  const add = () => {
    if (!f.name || !f.icon) return toast("Name and icon required", "error");
    onAdd({
      id: "s" + Date.now(),
      name: f.name,
      icon: f.icon,
      desc: f.desc,
      base: parseInt(f.base) || 299,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
    setF({ name: "", icon: "", desc: "", base: "" });
    toast("Service added!");
  };

  return (
    <div style={{ animation: "fadeIn .3s" }}>
      <h2 style={{ fontFamily: G.font, fontSize: 26, fontWeight: 800, letterSpacing: -1, marginBottom: 4 }}>Manage Services</h2>
      <p style={{ color: G.muted, fontSize: 14, marginBottom: 28 }}>Add or remove services from the platform</p>

      <div style={{ ...s.card(), padding: 28, maxWidth: 600, marginBottom: 32 }}>
        <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Add New Service</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Input label="Service Name" value={f.name} onChange={set("name")} placeholder="e.g. Carpenter" required theme={theme} />
          <Input label="Emoji Icon" value={f.icon} onChange={set("icon")} placeholder="🪚" required theme={theme} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
          <Input label="Description" value={f.desc} onChange={set("desc")} placeholder="Short description" theme={theme} />
          <Input label="Base Price (₹)" value={f.base} onChange={set("base")} placeholder="299" theme={theme} />
        </div>
        <button onClick={add} style={{ ...s.btn("primary"), boxShadow: `0 4px 16px ${G.accentGlow}` }}>
          + Add Service
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ fontWeight: 700, fontSize: 18 }}>All Services ({services.length})</h3>
        <button
          onClick={() => {
            const data = services.map(sv => ({
              "ID": sv.id,
              "Icon": sv.icon,
              "Name": sv.name,
              "Description": sv.desc,
              "Base Price": sv.base,
            }));
            downloadAsExcel(data, "Services_" + new Date().toISOString().split("T")[0]);
          }}
          style={{
            padding: "8px 14px",
            background: themeColors.accent,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all .2s",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
          onMouseEnter={e => e.target.style.opacity = "0.8"}
          onMouseLeave={e => e.target.style.opacity = "1"}
        >
          📥 Export
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
        {services.map(sv => (
          <div key={sv.id} style={{ ...s.card(), padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: `${sv.color}18`,
                border: `1.5px solid ${sv.color}33`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              {sv.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{sv.name}</div>
              <div style={{ fontSize: 12, color: G.muted }}>{sv.desc}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: sv.color, marginTop: 4 }}>₹{sv.base}</div>
            </div>
            <button
              onClick={() => {
                onDelete(sv.id);
                toast("Service removed");
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: G.muted,
                fontSize: 16,
                padding: 4,
                borderRadius: 6,
                transition: "color .2s",
              }}
              onMouseEnter={e => (e.target.style.color = G.danger)}
              onMouseLeave={e => (e.target.style.color = G.muted)}
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingModal({ booking: b, onClose, onStatus, theme = "dark" }) {
  const themeColors = getTheme(theme);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "fadeIn .2s",
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          ...s.card(),
          padding: 32,
          width: "100%",
          maxWidth: 520,
          maxHeight: "90vh",
          overflowY: "auto",
          animation: "fadeUp .3s ease",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h3 style={{ fontFamily: G.font, fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Booking Details</h3>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: G.muted }}>{b.id}</div>
          </div>
          <span style={s.badge(b.status)}>{b.status}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px", background: G.surface, borderRadius: 12, marginBottom: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: `${b.serviceColor}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
            {b.serviceIcon}
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{b.service}</div>
            <div style={{ fontSize: 12, color: G.muted }}>Booked on {b.createdAt}</div>
          </div>
          <div style={{ marginLeft: "auto", fontFamily: G.font, fontSize: 22, fontWeight: 800, color: b.serviceColor }}>₹{b.amount}</div>
        </div>

        {[
          ["Customer", b.name],
          ["Mobile", b.mobile],
          ["Address", b.address],
          ["Scheduled", fmtDT(b.datetime)],
          ["Time Slot", b.timeSlot || "N/A"],
          ["Duration", (b.days || 1) + " day(s)"],
          ["Issue", b.desc],
        ].map(([k, v], i) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: i < 6 ? `1px solid ${G.border}` : "none", fontSize: 14 }}>
            <span style={{ color: G.muted }}>{k}</span>
            <span style={{ fontWeight: 600, maxWidth: "60%", textAlign: "right" }}>{v}</span>
          </div>
        ))}

        {b.status === "Pending" && (
          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <button 
              onClick={() => onStatus("Confirmed")} 
              style={{ 
                flex: 1,
                padding: "12px 16px",
                background: G.success,
                color: "#000",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all .2s",
                boxShadow: `0 4px 12px rgba(34, 211, 122, 0.3)`
              }}
              onMouseEnter={e => e.target.style.opacity = "0.9"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >
              ✓ Confirm Booking
            </button>
            <button 
              onClick={() => onStatus("Cancelled")} 
              style={{ 
                flex: 1,
                padding: "12px 16px",
                background: G.danger,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all .2s",
                boxShadow: `0 4px 12px rgba(255, 71, 87, 0.3)`
              }}
              onMouseEnter={e => e.target.style.opacity = "0.9"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >
              ✕ Reject Booking
            </button>
          </div>
        )}

        {b.status === "Confirmed" && (
          <div style={{ marginTop: 24 }}>
            <button 
              onClick={() => onStatus("Done")} 
              style={{ 
                width: "100%",
                padding: "12px 16px",
                background: "#22d37a",
                color: "#000",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all .2s",
                boxShadow: `0 4px 12px rgba(34, 211, 122, 0.3)`
              }}
              onMouseEnter={e => e.target.style.opacity = "0.9"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >
              ✓ Mark as Completed
            </button>
          </div>
        )}

        <button onClick={onClose} style={{ ...s.btn("ghost", "sm"), width: "100%", marginTop: 12 }}>
          Close
        </button>
      </div>
    </div>
  );
}

// ─── MAIN ADMIN DASHBOARD ─────────────────────────────────────────────────────
export default function AdminDashboard({ users, bookings, services, onUpdateStatus, onAddService, onDeleteService, onDeleteUser, onDeleteBooking, onExportData, onLogout, lang, toast, theme = "dark" }) {
  const t = LANGUAGES[lang];
  const themeColors = getTheme(theme);
  const [tab, setTab] = useState("overview");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const sideItems = [
    { id: "overview", icon: "📊", label: "Overview" },
    { id: "bookings", icon: "📋", label: "All Bookings" },
    { id: "users", icon: "👥", label: "Users" },
    { id: "services", icon: "🛠️", label: "Manage Services" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)", background: themeColors.bg }} className="dashboard-grid">
      <aside
        style={{
          width: 230,
          background: themeColors.surface,
          borderRight: `1px solid ${themeColors.border}`,
          padding: "28px 14px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
        className="sidebar"
      >
        <div style={{ fontSize: 12, fontWeight: 700, color: themeColors.muted, textTransform: "uppercase", letterSpacing: 1 }}>Admin Panel</div>
        {sideItems.map(item => (
          <div
            key={item.id}
            onClick={() => setTab(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "11px 14px",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              marginBottom: 4,
              background: tab === item.id ? themeColors.accentDim : "transparent",
              color: tab === item.id ? themeColors.accent : themeColors.muted,
              transition: "all .2s",
              borderLeft: tab === item.id ? `3px solid ${themeColors.accent}` : "3px solid transparent",
            }}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ borderTop: `1px solid ${themeColors.border}`, paddingTop: 16, marginTop: 16 }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 10, 
            padding: "12px 14px", 
            background: `${themeColors.accent}20`, 
            border: `1px solid ${themeColors.accent}40`,
            borderRadius: 10, 
            marginBottom: 12, 
            cursor: "pointer",
            transition: "all .2s"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `${themeColors.accent}30`;
            e.currentTarget.style.borderColor = `${themeColors.accent}60`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = `${themeColors.accent}20`;
            e.currentTarget.style.borderColor = `${themeColors.accent}40`;
          }}>
            <span style={{ fontSize: 20 }}>🛡️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: themeColors.accent, letterSpacing: 0.5 }}>ADMIN PANEL</div>
              <div style={{ fontSize: 11, color: themeColors.muted, marginTop: 1 }}>Management</div>
            </div>
          </div>
          <div
          onClick={onLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "11px 14px",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 14,
            color: themeColors.danger,
            transition: "all .2s"
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          <span>🚪</span> {t.logout}
        </div>
        </div>
      </aside>

      <main style={{ flex: 1, padding: 36, overflow: "auto", background: themeColors.bg, color: themeColors.text }} className="main-content">
        {tab === "overview" && <AdminOverview bookings={bookings} users={users} onView={b => setSelectedBooking(b)} onExportData={onExportData} theme={theme} />}
        {tab === "bookings" && <AdminBookings bookings={bookings} users={users} onView={b => setSelectedBooking(b)} onStatus={onUpdateStatus} onDeleteBooking={onDeleteBooking} theme={theme} />}
        {tab === "users" && <AdminUsers users={users} bookings={bookings} onDeleteUser={onDeleteUser} theme={theme} />}
        {tab === "services" && <AdminServices services={services} onAdd={onAddService} onDelete={onDeleteService} toast={toast} theme={theme} />}
      </main>

      {selectedBooking && (
        <BookingModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} onStatus={st => { onUpdateStatus(selectedBooking.id, st); setSelectedBooking(null); }} theme={theme} />
      )}
    </div>
  );
}
