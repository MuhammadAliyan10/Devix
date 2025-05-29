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

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleSidebar }) => {
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
        setIsMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      toggleSidebar();
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
      <div key={item.name} className={isChild ? "ml-0" : ""}>
        <button
          onClick={() => {
            if (hasChildren && (isExpanded || isMobile)) {
              toggleSection(item.name);
            } else {
              handleItemClick(item.name, isChild);
            }
          }}
          className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-all duration-200 group relative ${
            isActive
              ? "text-indigo-600 light:bg-indigo-50 border-r-2 border-indigo-600"
              : "light:text-gray-700 text-primary light:hover:text-gray-900 dark:hover:bg-secondary light:hover:bg-gray-50"
          } ${!isExpanded && !isMobile && "justify-center px-2"} ${
            isChild ? "text-sm py-1.5 pl-9" : "text-sm"
          }`}
          aria-label={item.name}
        >
          <item.icon
            size={isChild ? 16 : 18}
            className={`flex-shrink-0 ${
              isActive ? "text-indigo-600" : "text-gray-500"
            }`}
          />
          {(isExpanded || isMobile) && (
            <>
              <span className="flex-grow font-medium">{item.name}</span>
              {hasChildren && (
                <div className="flex-shrink-0">
                  {isSectionExpanded ? (
                    <ChevronUp size={16} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400" />
                  )}
                </div>
              )}
            </>
          )}
        </button>
        {hasChildren && (isExpanded || isMobile) && isSectionExpanded && (
          <div className="py-1">
            {item.children.map((child) => renderNavItem(child, true))}
          </div>
        )}
      </div>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div
        className={`flex items-center px-4 py-4 border-b border-border ${
          !isExpanded && !isMobile && "justify-center px-2"
        }`}
      >
        {(isExpanded || isMobile) && (
          <span className="light:text-gray-900 text-primary font-semibold text-base">
            Devix
          </span>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="space-y-1">
          {navItems.map((item) => renderNavItem(item))}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-3">
        <button
          className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm font-medium light:text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200 group ${
            !isExpanded && !isMobile && "justify-center px-2"
          }`}
          aria-label="Logout"
        >
          <LogOut
            size={18}
            className="flex-shrink-0 light:text-gray-500 light:group-hover:text-red-600"
          />
          {(isExpanded || isMobile) && (
            <span className="group-hover:text-red-600">Logout</span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={handleToggleSidebar}
          className="fixed top-4 left-4 z-50 md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-background shadow-sm border border-border hover:bg-background/10 transition-all duration-200"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Mobile overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
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
                } w-72 h-full`
              : `fixed top-0 left-0 h-screen z-30 transition-all duration-300 ease-in-out ${
                  isExpanded ? "w-64" : "w-16"
                }`
          }
          bg-background border-r border-border shadow-sm
        `}
      >
        {/* Desktop toggle button */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute top-90 -right-3 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border border-border text-primary light:hover:text-gray-600 hover:bg-secondary light:hover:bg-gray-50 transition-all duration-200 shadow-sm"
            aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isExpanded ? (
              <ChevronLeft size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
        )}
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
