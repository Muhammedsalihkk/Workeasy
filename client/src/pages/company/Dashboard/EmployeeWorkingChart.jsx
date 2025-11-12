import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const hours = payload[0]?.value;
    return (
      <div className="rounded-xl shadow-lg bg-white/90 backdrop-blur px-4 py-3 border border-gray-100">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="mt-1 text-lg font-semibold text-gray-800">{hours} hrs</div>
      </div>
    );
  }
  return null;
};

export default function EmployeeWorkingChart() {
  // Average working hours per day (example data)
  const data = [
    { day: "Mon", hours: 7.5 },
    { day: "Tue", hours: 8.1 },
    { day: "Wed", hours: 7.8 },
    { day: "Thu", hours: 8.4 },
    { day: "Fri", hours: 7.2 },
    { day: "Sat", hours: 6.0 },
    { day: "Sun", hours: 5.5 },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Employee Working Hours</h2>
        <span className="text-xs text-gray-500">Last 7 days</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 6 }}>
          <defs>
            <linearGradient id="empGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#a855f7" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} domain={[0, 10]} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#9ca3af", strokeDasharray: "3 3" }} />
          <Legend formatter={(v) => <span className="text-gray-600 text-sm">{v === 'hours' ? 'Avg Hours' : v}</span>} />
          <Area type="monotone" dataKey="hours" stroke="#7c3aed" strokeWidth={3} fill="url(#empGradient)" dot={{ r: 3, fill: "#7c3aed" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}


