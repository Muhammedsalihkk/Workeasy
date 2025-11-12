import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#10b981", "#ef4444"]; // Working (green), Absent (red)

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="rounded-xl shadow-lg bg-white/90 backdrop-blur px-4 py-3 border border-gray-100">
        <div className="text-xs text-gray-500">{name}</div>
        <div className="mt-1 text-lg font-semibold text-gray-800">{value} employees</div>
      </div>
    );
  }
  return null;
};

export default function EmployeeCircleChart() {
  // Example attendance: working vs absent (counts)
  const data = [
    { name: "Working", value: 42 },
    { name: "Absent", value: 8 },
  ];

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Employee Attendance</h2>
        <span className="text-xs text-gray-500">Today</span>
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
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={({ name, value }) => `${name} (${Math.round((value / total) * 100)}%)`}
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


