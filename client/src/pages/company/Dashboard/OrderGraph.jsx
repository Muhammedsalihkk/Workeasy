import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl shadow-lg bg-white/90 backdrop-blur px-4 py-3 border border-gray-100">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="mt-1 text-lg font-semibold text-gray-800">
          {payload[0].value} orders
        </div>
      </div>
    );
  }
  return null;
};

const OrderStatsChart = () => {
  const orderData = [
    { status: "Pending", count: 25 },
    { status: "Completed", count: 40 },
    { status: "Cancelled", count: 10 },
    { status: "Returned", count: 5 },
  ];

  const colors = ["#f59e0b", "#10b981", "#ef4444", "#3b82f6"]; // base colors
  const hoverColors = ["#b45309", "#047857", "#b91c1c", "#1e40af"]; // hover colors

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Order Statistics</h2>
        <span className="text-xs text-gray-500">Last 30 days</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={orderData} margin={{ top: 10, right: 12, left: 0, bottom: 6 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis
            dataKey="status"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
          <Legend
            formatter={(value) => <span className="text-gray-600 text-sm">{value === "count" ? "Orders" : value}</span>}
            wrapperStyle={{ paddingTop: 8 }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={56}>
            {orderData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={activeIndex === index ? hoverColors[index % hoverColors.length] : colors[index % colors.length]}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderStatsChart;
