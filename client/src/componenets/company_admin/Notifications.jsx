import React, { useState } from 'react';
import { 
  BellIcon, 
  XMarkIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  InformationCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Header from './Header';

const NotificationsView = () => {
  const [activeTab, setActiveTab] = useState('all');
  const header=<div className='flex gap-2.5'>
   <BellIcon className="w-7 h-7 text-gray-700" />
          <h2 className="text-xl font-bold text-gray-800">Notifications</h2></div>
  const [notifications, setNotifications] = useState([
   
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const filteredNotifications = activeTab === 'unread' 
    ? notifications.filter(n => n.unread)
    : notifications;

  const getIcon = (type) => {
    const iconClass = "w-6 h-6";
    switch(type) {
      case 'success':
        return <CheckCircleIcon className={`${iconClass} text-green-500`} />;
      case 'alert':
        return <ExclamationCircleIcon className={`${iconClass} text-yellow-500`} />;
      default:
        return <InformationCircleIcon className={`${iconClass} text-blue-500`} />;
    }
  };

  return (
  notifications.length!=0? <div className="flex flex-col items-center w-full justify-center py-10 bg-white rounded-lg shadow-md border border-gray-200">
    <BellIcon className="w-7 h-7 text-gray-700" />
    <p className="text-gray-500 text-lg font-medium">No notifications</p>
    <p className="text-gray-400 text-sm mt-1">You're all caught up!</p>
  </div>:(  <div className=" w-full bg-white rounded-xl  overflow-hidden">
      {/* Header */}
      <Header message={header}/>
      {/* Tabs */}
      <div className="flex border-b  m-10 ">
        <button
          className={`flex-1 py-3 text-sm font-medium ${activeTab === 'all' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium ${activeTab === 'unread' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('unread')}
        >
          Unread
        </button>
      </div>

      {/* Notifications List */}
      <div className="divide-y overflow-scroll m-10 h-105">
        {filteredNotifications.length == 0 ? (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`relative px-6 py-4 ${notification.unread ? 'bg-indigo-50' : ''}`}
            >
              {notification.unread && (
                <div className="absolute top-4 left-2 w-2 h-2 bg-indigo-500 rounded-full"></div>
              )}
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-900">{notification.title}</h3>
                  <p className="mt-1 text-gray-600">{notification.message}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{notification.time}</span>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs font-medium text-gray-500 hover:text-gray-700"
                      >
                        Dismiss
                      </button>
                      <button className="text-xs font-medium text-indigo-600 flex items-center">
                        View <ArrowRightIcon className="ml-1 w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => markAsRead(notification.id)}
                  className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <BellIcon className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'unread' 
                ? "You're all caught up!" 
                : "No notifications to display"}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 text-center">
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
          View all notifications
        </button>
      </div>
    </div>)
  );
};

export default NotificationsView;