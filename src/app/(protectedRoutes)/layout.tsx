"use client";
import React, { useState } from "react";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="fixed top-0 left-0 h-screen z-30">
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      </div>

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isExpanded ? "ml-64" : "ml-16"
        }`}
      >
        <div
          className={`fixed top-0 z-20 transition-all duration-300 ${
            isExpanded ? "left-64" : "left-16"
          } right-0`}
        >
          <Navbar onMenuToggle={toggleSidebar} isSidebarExpanded={isExpanded} />
        </div>

        <main className="flex-1 overflow-y-auto pt-16 pl-4 pr-4 pb-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
