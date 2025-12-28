import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ children, className, hover = false, glow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-card/60 backdrop-blur-xl border border-border/40 rounded-xl p-6",
        hover && "transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10",
        glow && "shadow-lg shadow-primary/20",
        className
      )}
    >
      {children}
    </div>
  );
}
