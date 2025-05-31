"use client";

import React, { useState } from "react";
import Navbar from "../../components/LayoutComponents/Navbar";
import Sidebar from "../../components/LayoutComponents/Sidebar";
import SessionProvider from "@/provider/SessionProvider";

interface User {
  id: string;
  name: string;
  email?: string;
  profileImageUrl: string | null;
  createdAt?: Date;
}

interface Session {
  id: string;
  expiresAt: Date;
  fresh: boolean;
  userId: string;
}

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  session: Session;
}

const ClientLayout = ({ children, user, session }: LayoutProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <SessionProvider value={{ user, session }}>
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
            <Navbar
              onMenuToggle={toggleSidebar}
              isSidebarExpanded={isExpanded}
            />
          </div>

          <main className="flex-1 overflow-y-auto pt-16 pl-4 pr-4 pb-4">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
};

export default ClientLayout;
