import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Bot,
  LayoutDashboard,
  CalendarCheck,
  FileText,
  FlaskConical,
  Map,
  TrendingUp,
  Target,
  User,
  ChevronLeft,
  ChevronRight,
  Compass,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "AI Agent", url: "/ai-agent", icon: Bot },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Daily Tasks", url: "/daily-tasks", icon: CalendarCheck },
  { title: "Resume Analyzer", url: "/resume", icon: FileText },
  { title: "Skill Lab", url: "/skill-lab", icon: FlaskConical },
  { title: "Roadmap", url: "/roadmap", icon: Map },
  { title: "Progress", url: "/progress", icon: TrendingUp },
  { title: "Opportunities", url: "/opportunities", icon: Target },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-sidebar-border">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <Compass className="w-5 h-5 text-primary-foreground" />
          </div>
          <Sparkles className="w-3 h-3 text-accent absolute -top-1 -right-1 animate-pulse" />
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
          onClick={() => setCollapsed(!collapsed)}
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
