import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppLayout({ children }) {
  const { user, signOut } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("user_id", user.id)
          .single();
        
        if (data?.display_name) {
          setDisplayName(data.display_name);
        }
      }
    }
    fetchProfile();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar onCollapsedChange={setSidebarCollapsed} />
      
      {/* Top bar with user menu */}
      <div 
        className={`fixed top-0 right-0 z-30 h-16 flex items-center px-6 transition-all duration-300 ${
          sidebarCollapsed ? "left-16" : "left-64"
        }`}
      >
        <div className="flex-1" />
        <div className="flex items-center">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 h-10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="hidden md:inline text-sm font-medium">
                    {displayName || user.email?.split("@")[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="text-destructive cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="gradient" size="sm">
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>

      <main 
        className={`min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "pl-16" : "pl-64"
        }`}
      >
        {children}
      </main>
    </div>
  );
}