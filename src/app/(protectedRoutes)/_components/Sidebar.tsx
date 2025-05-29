"use client";
import {
  BookOpen,
  BarChart3,
  Home,
  NotepadText,
  Rss,
  User,
  Settings,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  LogOut,
  Trophy,
  FileText,
  Users,
  Bell,
  HelpCircle,
  Menu,
  X,
  Target,
  Calendar,
  MessageCircle,
  Search,
  Bookmark,
  TrendingUp,
  Code,
  Brain,
  Zap,
  Globe,
  Heart,
  Star,
} from "lucide-react";
import React, { useState, useEffect } from "react";

interface NavItem {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  section: string | null;
  children?: {
    name: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }[];
}

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activePage, setActivePage] = useState<string>("Home");
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true); // Ensure expanded on desktop
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const navItems: NavItem[] = [
    { name: "Home", icon: Home, section: null },
    { name: "Dashboard", icon: BarChart3, section: null },
    {
      name: "Career Development",
      icon: Trophy,
      section: "dropdown",
      children: [
        { name: "Progress Tracking", icon: TrendingUp },
        { name: "Skill Assessment", icon: Brain },
        { name: "Learning Resources", icon: BookOpen },
        { name: "Career Goals", icon: Target },
        { name: "Quizzes & Tests", icon: NotepadText },
        { name: "Achievements", icon: Star },
        { name: "Career Path", icon: Zap },
      ],
    },
    {
      name: "Technology Hub",
      icon: Code,
      section: "dropdown",
      children: [
        { name: "Tech News", icon: Rss },
        { name: "Developer Blogs", icon: FileText },
        { name: "Community Forums", icon: Users },
        { name: "Code Snippets", icon: Code },
        { name: "Tech Events", icon: Calendar },
        { name: "Industry Trends", icon: Globe },
        { name: "Bookmarks", icon: Bookmark },
      ],
    },
    {
      name: "Learning Center",
      icon: BookOpen,
      section: "dropdown",
      children: [
        { name: "Courses", icon: BookOpen },
        { name: "Tutorials", icon: FileText },
        { name: "Practice Labs", icon: Code },
        { name: "Study Groups", icon: Users },
        { name: "Certifications", icon: Trophy },
        { name: "Saved Content", icon: Heart },
      ],
    },
    {
      name: "Social & Networking",
      icon: Users,
      section: "dropdown",
      children: [
        { name: "My Profile", icon: User },
        { name: "Connections", icon: Users },
        { name: "Messages", icon: MessageCircle },
        { name: "Group Discussions", icon: MessageCircle },
        { name: "Mentorship", icon: User },
        { name: "Job Board", icon: Search },
      ],
    },

    { name: "Calendar", icon: Calendar, section: null },
    { name: "Help & Support", icon: HelpCircle, section: null },
  ];

  const handleItemClick = (itemName: string, isChild: boolean = false) => {
    setActivePage(itemName);
    if (isMobile && !isChild) {
      setIsMobileMenuOpen(false);
    }
  };

  const renderNavItem = (item: NavItem, isChild: boolean = false) => {
    const isActive = activePage === item.name;
    const hasChildren = item.children && item.children.length > 0;
    const isSectionExpanded = expandedSections[item.name];

    return (
      <div key={item.name} className={isChild ? "ml-4" : ""}>
        <button
          onClick={() => {
            if (hasChildren && (isExpanded || isMobile)) {
              toggleSection(item.name);
            } else {
              handleItemClick(item.name, isChild);
            }
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
            isActive
              ? "bg-secondary text-primary shadow-lg"
              : "hover:bg-secondary text-foreground hover:text-foreground"
          } ${!isExpanded && !isMobile && "justify-center"} ${
            isChild ? "text-sm py-2" : ""
          }`}
          aria-label={item.name}
        >
          {/* Active indicator */}
          <div
            className={`absolute left-0 top-0 h-full w-1 bg-secondary transition-transform duration-300 ${
              isActive ? "transform scale-y-100" : "transform scale-y-0"
            }`}
          />

          <item.icon size={isChild ? 16 : 20} className="flex-shrink-0" />

          {(isExpanded || isMobile) && (
            <>
              <span
                className={`font-medium leading-normal flex-grow text-left ${
                  isChild ? "text-sm" : "text-base"
                }`}
              >
                {item.name}
              </span>
              {hasChildren && (
                <div className="flex-shrink-0">
                  {isSectionExpanded ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
              )}
            </>
          )}

          {/* Tooltip for collapsed state */}
          {!isExpanded && !isMobile && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border">
              {item.name}
              <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-popover rotate-45 border-l border-b" />
            </div>
          )}
        </button>

        {/* Dropdown children */}
        {hasChildren &&
          (isExpanded || isMobile) &&
          expandedSections[item.name] && (
            <div className="mt-2 space-y-1 pl-4 border-l-2 border-border ml-4">
              {item.children.map((child) => renderNavItem(child, true))}
            </div>
          )}
      </div>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className={`flex gap-4 items-center p-6 border-b border-border ${
          !isExpanded && !isMobile && "justify-center px-4"
        }`}
      >
        <div className="relative">
          <div className="bg-secondary rounded-full size-12 flex items-center justify-center text-primary font-bold text-lg shadow-lg">
            S
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
        </div>
        {(isExpanded || isMobile) && (
          <div className="flex flex-col">
            <h1 className="text-foreground text-lg font-bold leading-normal">
              Sophia Chen
            </h1>
            <p className="text-muted-foreground text-sm font-medium leading-normal">
              Full Stack Developer
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-2">
          {navItems.map((item) => renderNavItem(item))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <button
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 text-destructive transition-all duration-300 group ${
            !isExpanded && !isMobile && "justify-center"
          }`}
          aria-label="Logout"
        >
          <LogOut size={20} className="flex-shrink-0" />
          {(isExpanded || isMobile) && (
            <span className="font-medium leading-normal">Logout</span>
          )}

          {/* Tooltip for collapsed state */}
          {!isExpanded && !isMobile && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border">
              Logout
              <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-popover rotate-45 border-l border-b" />
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 md:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-background shadow-lg border border-border hover:shadow-xl transition-all duration-300"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${
            isMobile
              ? `fixed top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
                  isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                } w-80 h-full`
              : `relative transition-all duration-300 ease-in-out ${
                  isExpanded ? "w-80" : "w-20"
                } h-screen flex-shrink-0`
          }
          bg-background border-r border-border shadow-xl
        `}
      >
        {/* Desktop Toggle Button */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute top-2 -right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-primary hover:bg-secondary/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
            aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isExpanded ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
        )}

        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
