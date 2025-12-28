import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "primary" | "accent" | "chart-3" | "chart-4" | "chart-5";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = "primary",
}: StatCardProps) {
  const colorClasses = {
    primary: "from-primary/20 to-primary/5 border-primary/20 text-primary",
    accent: "from-accent/20 to-accent/5 border-accent/20 text-accent",
    "chart-3": "from-chart-3/20 to-chart-3/5 border-chart-3/20 text-chart-3",
    "chart-4": "from-chart-4/20 to-chart-4/5 border-chart-4/20 text-chart-4",
    "chart-5": "from-chart-5/20 to-chart-5/5 border-chart-5/20 text-chart-5",
  };

  const iconColorClasses = {
    primary: "bg-primary/20 text-primary",
    accent: "bg-accent/20 text-accent",
    "chart-3": "bg-chart-3/20 text-chart-3",
    "chart-4": "bg-chart-4/20 text-chart-4",
    "chart-5": "bg-chart-5/20 text-chart-5",
  };

  return (
    <div
      className={cn(
        "glass-card-hover bg-gradient-to-br p-6 relative overflow-hidden group",
        colorClasses[color]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-display font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div className="flex items-center gap-1 text-xs">
              <span
                className={cn(
                  "font-medium",
                  trend === "up" && "text-chart-4",
                  trend === "down" && "text-destructive",
                  trend === "neutral" && "text-muted-foreground"
                )}
              >
                {trend === "up" && "↑"}
                {trend === "down" && "↓"}
                {trendValue}
              </span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
            iconColorClasses[color]
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Decorative gradient orb */}
      <div
        className={cn(
          "absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-40",
          color === "primary" && "bg-primary",
          color === "accent" && "bg-accent",
          color === "chart-3" && "bg-chart-3",
          color === "chart-4" && "bg-chart-4",
          color === "chart-5" && "bg-chart-5"
        )}
      />
    </div>
  );
}
