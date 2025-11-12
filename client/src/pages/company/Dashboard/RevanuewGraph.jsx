import React from "react";
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const revenue = payload.find(p => p.dataKey === 'revenue')?.value;
    return (
      <div className="rounded-xl shadow-lg bg-white/90 backdrop-blur px-4 py-3 border border-gray-100">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="mt-1 text-lg font-semibold text-gray-800">${revenue?.toLocaleString()}</div>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 2000 },
    { month: "Apr", revenue: 2780 },
    { month: "May", revenue: 1890 },
    { month: "Jun", revenue: 2390 },
    { month: "Jul", revenue: 3490 },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Revenue Overview</h2>
        <span className="text-xs text-gray-500">Last 7 months</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={revenueData} margin={{ top: 10, right: 12, left: 0, bottom: 6 }}>
          <defs>
            <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
            tickFormatter={(v) => `$${v / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#9ca3af", strokeDasharray: "3 3" }} />
          <Legend formatter={(v) => <span className="text-gray-600 text-sm">{v === 'revenue' ? 'Revenue' : v}</span>} />
          <Area type="monotone" dataKey="revenue" stroke="none" fill="url(#revGradient)" />
          <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} dot={{ r: 5, fill: "#2563eb" }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
