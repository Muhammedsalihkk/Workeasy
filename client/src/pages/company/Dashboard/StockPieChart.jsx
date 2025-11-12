import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#22c55e"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="rounded-xl shadow-lg bg-white/90 backdrop-blur px-4 py-3 border border-gray-100">
        <div className="text-xs text-gray-500">{name}</div>
        <div className="mt-1 text-lg font-semibold text-gray-800">{value.toLocaleString()} units</div>
      </div>
    );
  }
  return null;
};

export default function StockPieChart() {
  const data = [
    { name: "Electronics", value: 540 },
    { name: "Clothing", value: 320 },
    { name: "Home & Kitchen", value: 210 },
    { name: "Beauty", value: 160 },
    { name: "Sports", value: 120 },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Stock Distribution</h2>
        <span className="text-xs text-gray-500">By category</span>
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={24} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


