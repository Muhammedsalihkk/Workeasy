import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

const OrderStatsChart = () => {
  const orderData = [
    { status: "Pending", count: 25 },
    { status: "Completed", count: 40 },
    { status: "Cancelled", count: 10 },
    { status: "Returned", count: 5 },
  ];

  const colors = ["#f59e0b", "#10b981", "#ef4444", "#3b82f6"]; // Normal colors
  const hoverColors = ["#b45309", "#047857", "#b91c1c", "#1e40af"]; // Hover colors

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Statistics</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={orderData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" barSize={40}>
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
