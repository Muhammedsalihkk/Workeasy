// components/AppLayout.jsx
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header"; 
import Sidebar from "./Sidebar";


export default function AppLayout() {


  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    localStorage.removeItem("viewID");
  }, [sidebarCollapsed]);



  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 pt-16 transition-all duration-300 ease-in-out">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
