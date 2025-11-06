import React from "react";
import { ShoppingCart, DollarSign, Box, UserMinus } from "lucide-react";

const Cards = ({ stats }) => {
  // stats should be an object like:
  // { income: 12000, orders: 45, stock: 200, absentEmployees: 3 }

  const cards = [
    { title: "Income", value: stats.income, icon: <DollarSign className="w-6 h-6 text-white" />, bg: "bg-green-500" },
    { title: "Orders", value: stats.orders, icon: <ShoppingCart className="w-6 h-6 text-white" />, bg: "bg-blue-500" },
    { title: "Stock", value: stats.stock, icon: <Box className="w-6 h-6 text-white" />, bg: "bg-yellow-500" },
    { title: "Absent Employees", value: stats.absentEmployees, icon: <UserMinus className="w-6 h-6 text-white" />, bg: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="flex items-center p-6 bg-white shadow-md rounded-2xl">
          <div className={`p-4 rounded-full ${card.bg} flex items-center justify-center`}>
            {card.icon}
          </div>
          <div className="ml-4">
            <p className="text-gray-500 text-sm">{card.title}</p>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards
