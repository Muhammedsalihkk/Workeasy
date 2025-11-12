import React from "react";
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const stock = payload.find(p => p.dataKey === 'stock')?.value;
    return (
      <div className="rounded-xl shadow-lg bg-white/90 backdrop-blur px-4 py-3 border border-gray-100">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="mt-1 text-lg font-semibold text-gray-800">{stock?.toLocaleString()} units</div>
      </div>
    );
  }
  return null;
};

export default function StockChart() {
  const data = [
    { month: "Jan", stock: 1200 },
    { month: "Feb", stock: 1150 },
    { month: "Mar", stock: 1560 },
    { month: "Apr", stock: 1320 },
    { month: "May", stock: 1780 },
    { month: "Jun", stock: 1670 },
    { month: "Jul", stock: 1840 },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Stock Levels</h2>
        <span className="text-xs text-gray-500">Last 7 months</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 6 }}>
          <defs>
            <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#9ca3af", strokeDasharray: "3 3" }} />
          <Legend formatter={(v) => <span className="text-gray-600 text-sm">{v === 'stock' ? 'Stock' : v}</span>} />
          <Area type="monotone" dataKey="stock" stroke="none" fill="url(#stockGradient)" />
          <Line type="monotone" dataKey="stock" stroke="#059669" strokeWidth={3} dot={{ r: 5, fill: "#059669" }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}


