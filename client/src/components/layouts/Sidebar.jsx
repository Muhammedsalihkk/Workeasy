import React, { useState } from "react";
import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  TagIcon,
  BellIcon,
  BuildingOffice2Icon,
  ArrowTrendingUpIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { User2Icon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
    { name: "Analytics", icon: ChartBarIcon },
    { name: "Employees", icon: UserGroupIcon, path: "/employees" },
    { name: "Orders", icon: ShoppingBagIcon, path: "/orders" },
    { name: "Attendance", icon: UserGroupIcon },
    { name: "Salary", icon: TagIcon },
    { name: "Notification", icon: BellIcon },
    { name: "CompanyProfile", icon: BuildingOffice2Icon, path: "/companyProfile" },
    { name: "Stocks", icon: ArrowTrendingUpIcon },
    { name: "User profile", icon: User2Icon, path: "/user/profile" },
  ];

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-gray-800 text-white lg:hidden"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-200 text-black z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 transition-transform duration-300`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-full lg:hidden text-black"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="flex flex-col h-full p-5">
          <div className="mb-10 grid justify-center px-2">
            <div className="w-12 h-12 rounded-full mx-auto overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5e3Q2Y7kgmlwt_I4ah-twm-ltwubD5FZJCQ&s"
                className="w-full h-full object-cover mb-2"
                alt="Logo"
              />
            </div>
            <h1 className="text-lg font-bold mt-1 text-center">TechCorp</h1>
          </div>

          <nav className="mb-8">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition hover:bg-gray-300
                      ${
                        location.pathname.startsWith(item.path || "")
                          
                      }`}
                    onClick={() => item.path && navigate(item.path)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="ml-3">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
