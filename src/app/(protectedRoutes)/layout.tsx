"use client";
import React from "react";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="fixed top-0 left-0 h-screen z-30">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col ml-64">
        <div className="fixed top-0 left-64 right-0 z-20">
          <Navbar />
        </div>

        <main className="flex-1 overflow-y-auto pt-16 pl-4 pr-4 pb-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
