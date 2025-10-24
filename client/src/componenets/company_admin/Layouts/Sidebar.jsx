import React, { useState } from 'react';
import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  TagIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  Bars3Icon,
  ChevronDownIcon,
  BellIcon,
  BuildingOffice2Icon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { User2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate()
  const navItems = [
    { name: 'Dashboard', icon: HomeIcon },
    { name: 'Analytics', icon: ChartBarIcon },
    { name: 'Employees', icon: UserGroupIcon },
    { name: 'Orders', icon: ShoppingBagIcon, path:'/orders' },
    { name: 'Attendance', icon: UserGroupIcon },
    { name: 'Salary', icon: TagIcon },
    { name: 'Notification', icon: BellIcon },
    { name: 'CompanyProfile', icon: BuildingOffice2Icon },
    { name: 'Stocks', icon: ArrowTrendingUpIcon },
    { name: "User profile", icon: User2Icon, path:"/user/profile" }
  ];

  return (
    <div>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-gray-800 text-white lg:hidden"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-200 text-black z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:h-screen`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-full bg-gray- text-white lg:hidden"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="flex flex-col h-full p-5">
          <div className="mb-10 grid justify-center px-2">
            <div className="w-20 h-20 rounded-full ml-3 overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5e3Q2Y7kgmlwt_I4ah-twm-ltwubD5FZJCQ&s"
                className="w-full h-full object-cover mb-10"
                alt="Logo"
              />
            </div>
            <h1 className="text-2xl font-bold mt-5 text-black">TechCorp</h1>
          </div>

          {/* Navigation */}
          <nav className="mb-8">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-400 transition-all"
                    onClick={()=>navigate(item.path)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
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
