import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Bot,
  LayoutDashboard,
  CalendarCheck,
  FileText,
  FlaskConical,
  Target,
  User,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "AI Agent", url: "/ai-agent", icon: Bot },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Saved Roadmaps", url: "/saved-roadmaps", icon: Bookmark },
  { title: "Daily Tasks", url: "/daily-tasks", icon: CalendarCheck },
  { title: "Resume Analyzer", url: "/resume", icon: FileText },
  { title: "Skill Lab", url: "/skill-lab", icon: FlaskConical },
  { title: "Opportunities", url: "/opportunities", icon: Target },
  { title: "Profile", url: "/profile", icon: User },
];

interface AppSidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function AppSidebar({ onCollapsedChange }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onCollapsedChange?.(newCollapsed);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
          <Rocket className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-display font-bold text-foreground text-lg leading-tight">
              Career Compass
            </span>
            <span className="text-xs text-muted-foreground">Powered by Gemini</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-hide">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-primary/20 to-accent/10 text-primary border border-primary/20"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                      isActive && "text-primary"
                    )}
                  />
                  {!collapsed && (
                    <span className="font-medium text-sm">{item.title}</span>
                  )}
                  {isActive && !collapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <div className="p-2 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center"
          onClick={handleToggle}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="ml-2">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
