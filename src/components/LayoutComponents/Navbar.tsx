import { logout } from "@/app/(auth)/actions";
import { Input } from "@/components/ui/input";
import { useSession } from "@/provider/SessionProvider";
import {
  Bell,
  Search,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  LogOut,
  UserCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

interface NavbarProps {
  onMenuToggle: () => void;
  isSidebarExpanded: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { user } = useSession();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] =
    useState<boolean>(false);
  const { setTheme, theme } = useTheme();

  // Check for mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(theme === "dark" ? "light" : "dark");
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
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error while logout. Try again later.");
    }
  };

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
    <header className="bg-background z-20">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {isMobile && (
            <button
              onClick={onMenuToggle}
              className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-primary hover:bg-background rounded-md transition-colors"
            >
              <Menu size={20} />
            </button>
          )}

          {/* Search Bar - Stripe style */}
          {!isMobile && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search..."
                className="w-[40rem] pl-10 pr-4 py-2 text-sm light:bg-gray-50 bg-secondary border border-border light:border-gray-200 rounded-md focus:outline-none focus:ring-2 light:focus:ring-indigo-500 focus:border-transparent placeholder-gray-500"
              />
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Search */}
          {isMobile && (
            <button
              onClick={toggleSearch}
              className="flex items-center justify-center w-8 h-8 bg-background hover:text-secondary light:text-gray-600 light:hover:text-gray-900 light:hover:bg-gray-100 rounded-md transition-colors"
            >
              <Search size={18} />
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 text-primary hover:bg-secondary light:text-gray-600 light:hover:text-gray-900 light:hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
          <div className="relative notification-menu">
            <button
              onClick={toggleNotificationMenu}
              className="relative flex items-center justify-center w-8 h-8 text-primary hover:bg-secondary light:text-gray-600 light:hover:text-gray-900 light:hover:bg-gray-100 rounded-md transition-colors"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationMenuOpen && (
              <div className="absolute right-0 top-10 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-primary light:text-gray-900">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <span className="text-xs text-muted-foreground light:text-gray-500">
                        {unreadCount} unread
                      </span>
                    )}
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto bg-card">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border light:border-gray-100 hover:bg-card/10 light:hover:bg-gray-50 cursor-pointer ${
                        notification.unread ? "bg-card" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-primary light:text-gray-900">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-secondary mt-2">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <button className="w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="flex items-center justify-center w-8 h-8 text-primary hover:bg-secondary light:text-gray-600 light:hover:text-gray-900 light:hover:bg-gray-100  rounded-md transition-colors">
            <Settings size={18} />
          </button>

          {/* Profile Menu */}
          <div className="relative profile-menu">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center gap-2 p-1 light:hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
              aria-label="Profile menu"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.profileImageUrl
                    ? user.profileImageUrl
                    : user.name.slice(0, 1)}
                </span>
              </div>
              <ChevronDown size={14} className="text-gray-500" />
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 top-10 w-64 bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-card rounded-full border-border border flex items-center justify-center">
                      <span className="text-primary font-medium">
                        {user.profileImageUrl
                          ? user.profileImageUrl
                          : user.name.slice(0, 1)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">
                        {user?.name ? user.name : "unknown"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button className="flex items-center gap-3 px-4 py-2 text-sm text-primary hover:bg-secondary light:hover:bg-gray-50 w-full text-left">
                    <UserCircle size={16} />
                    Profile
                  </button>
                  <button className="flex items-center gap-3 px-4 py-2 text-primary hover:bg-secondary light:hover:bg-gray-50 w-full text-left">
                    <Settings size={16} />
                    Account Settings
                  </button>

                  <hr className="my-2 border-border" />
                  <button
                    className="flex items-center gap-3 px-4 py-2 text-primary hover:bg-secondary light:hover:bg-gray-50 w-full text-left"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobile && isSearchOpen && (
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500"
                autoFocus
              />
            </div>
            <button
              onClick={toggleSearch}
              className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
