import React from "react";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background">
      <Navbar />
      <div className="flex w-full min-h-screen">
        <Sidebar />
        <div className="flex-1 py-10">{children}</div>
      </div>
    </div>
  );
};

export default layout;
