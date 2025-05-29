"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Search,
  Settings,
  User,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  LogOut,
  UserCircle,
  HelpCircle,
} from "lucide-react";
import React, { useState, useEffect } from "react";

interface NavbarProps {
  onMenuToggle?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] =
    useState<boolean>(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsNotificationMenuOpen(false);
  };

  const toggleNotificationMenu = () => {
    setIsNotificationMenuOpen(!isNotificationMenuOpen);
    setIsProfileMenuOpen(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".profile-menu") &&
        !target.closest(".notification-menu")
      ) {
        setIsProfileMenuOpen(false);
        setIsNotificationMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New course available",
      message: "React Advanced Patterns is now live",
      time: "2m ago",
      unread: true,
    },
    {
      id: 2,
      title: "Quiz completed",
      message: "You scored 95% on JavaScript Fundamentals",
      time: "1h ago",
      unread: true,
    },
    {
      id: 3,
      title: "Achievement unlocked",
      message: "You've earned the 'Fast Learner' badge",
      time: "3h ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="layout-container flex h-full grow flex-col">
      <header className="flex items-center justify-between border-b border-border px-4 md:px-10 py-3 relative">
        <div className="flex items-center gap-4 text-primary">
          {isMobile && (
            <Button
              onClick={onMenuToggle}
              className="flex md:hidden items-center rounded-xl h-10 bg-secondary text-primary text-sm font-bold px-2.5"
            >
              <Menu size={20} />
            </Button>
          )}

          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-primary text-lg font-bold">Devix</h2>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 justify-end items-center gap-2 md:gap-8">
          {/* Desktop Search */}
          {!isMobile && (
            <div className="flex min-w-40 h-10 max-w-64">
              <div className="text-primary flex items-center justify-center px-2 rounded-l-xl bg-secondary">
                <Search size={18} />
              </div>
              <Input
                placeholder="Search"
                className="flex w-full rounded-xl text-primary bg-secondary h-full placeholder:text-primary px-4 rounded-l-none pl-2 text-base font-normal"
              />
            </div>
          )}

          <div className="flex gap-2">
            {isMobile && (
              <Button
                onClick={toggleSearch}
                className="flex items-center rounded-xl h-10 bg-secondary text-primary text-sm font-bold px-2.5"
              >
                <Search size={20} />
              </Button>
            )}

            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              className="flex items-center rounded-xl h-10 bg-secondary text-primary text-sm font-bold px-2.5 hover:bg-secondary"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            {/* Notifications */}
            <div className="relative notification-menu">
              <Button
                onClick={toggleNotificationMenu}
                className="flex items-center rounded-xl h-10 bg-secondary  hover:bg-secondary text-primary text-sm font-bold px-2.5 relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>

              {/* Notifications Dropdown */}
              {isNotificationMenuOpen && (
                <div className="absolute right-0 top-12 w-80 bg-background border border-border rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-foreground">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <p className="text-sm text-muted-foreground">
                        {unreadCount} unread
                      </p>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-border hover:bg-secondary cursor-pointer ${
                          notification.unread ? "bg-secondary/50" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-foreground">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-border">
                    <Button variant="ghost" className="w-full text-sm">
                      View all notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <Button className="flex items-center rounded-xl h-10 bg-secondary  hover:bg-secondary text-primary text-sm font-bold px-2.5">
              <Settings size={20} />
            </Button>
          </div>

          {/* Profile Menu */}
          <div className="relative profile-menu">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center gap-2 rounded-full size-10 bg-secondary hover:bg-secondary/80 transition-colors duration-200"
              aria-label="Profile menu"
            >
              <div className="rounded-full size-10 bg-primary/10 flex items-center justify-center">
                <User size={20} className="text-primary" />
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 top-12 w-64 bg-background border border-border rounded-xl shadow-lg z-50">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full size-12 bg-primary/10 flex items-center justify-center">
                      <User size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Sophia Chen
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Full Stack Developer
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary w-full text-left">
                    <UserCircle size={16} />
                    My Profile
                  </button>
                  <button className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary w-full text-left">
                    <Settings size={16} />
                    Account Settings
                  </button>
                  <button className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary w-full text-left">
                    <HelpCircle size={16} />
                    Help & Support
                  </button>
                  <hr className="my-2 border-border" />
                  <button className="flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 w-full text-left">
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobile && isSearchOpen && (
          <div className="absolute top-full left-0 right-0 p-4 bg-background border-b border-border z-40">
            <div className="flex gap-2">
              <div className="flex flex-1 h-10">
                <div className="text-primary flex items-center justify-center px-2 rounded-l-xl bg-secondary">
                  <Search size={18} />
                </div>
                <Input
                  placeholder="Search"
                  className="flex w-full rounded-xl text-primary bg-secondary h-full placeholder:text-primary px-4 rounded-l-none pl-2 text-base font-normal"
                  autoFocus
                />
              </div>
              <Button
                onClick={toggleSearch}
                className="flex items-center rounded-xl h-10 bg-secondary text-primary text-sm font-bold px-2.5"
              >
                <X size={20} />
              </Button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
