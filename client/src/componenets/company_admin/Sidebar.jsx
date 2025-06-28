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
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Analytics');

  const navItems = [
    { name: 'Dashboard', icon: HomeIcon },
    { name: 'Analytics', icon: ChartBarIcon },
    { name: 'Stock Details', icon: UserGroupIcon },
    { name: 'Orders', icon: ShoppingBagIcon },
    { name: 'Notification', icon: TagIcon },
    { name: 'Comapny profile', icon: ChatBubbleLeftRightIcon },
  ];

  const metrics = [
    { name: 'Total Revenue', value: '$128,459', change: '+12.5% vs last month' },
    { name: 'Total Expenses', value: '$64,232', change: '+8.2% vs last month' },
    { name: 'Net Profit', value: '$64,227', change: '+16.8% vs last month' },
  ];

  return (
    < div>
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
          className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-gray-200 text-black z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:h-screen`}
      >
        {/* Close button for mobile */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-full bg-gray- text-white lg:hidden"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="flex flex-col h-full p-5">
          {/* Logo */}
          <div className="mb-10 grid justify-center  px-2">
             <img src="https://d3bql97l1ytoxn.cloudfront.net/app_resources/422275/thumbs_112/img6234590148314030139-2x.png" className='w-18 ml-5' alt="" />
            <h1 className="text-2xl font-bold text-black">Analytica</h1>
          </div>

          {/* Navigation */}
          <nav className="mb-8">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => setActiveItem(item.name)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                      activeItem === item.name 
                        ? 'bg-black text-white' 
                        : 'hover:bg-gray-400'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                    {item.name === activeItem && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-blue-300"></div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Metrics Section */}
            <div onClick={()=>{
              setActiveItem("profile")
            }}
             className={`mt-auto flex items-center p-2 rounded-lg ${
              activeItem=="profile"?'bg-black text-white':
              'hover:bg-gray-400'
             }`}>
             
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
            <div className="ml-3">
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-black-400">admin@analytica.com</p>
            </div>
          </div>
       
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;