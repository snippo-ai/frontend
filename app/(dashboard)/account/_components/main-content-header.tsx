import Typography from "@/components/shared/typography";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { memo } from "react";

interface MainContentHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}

const MainContentHeader = memo<MainContentHeaderProps>(
  ({ title, description, icon: Icon, className = "" }) => {
    return (
      <header className={cn("mb-4", className)}>
        <h2
          className="flex items-center gap-2 text-xl font-semibold"
          id={`${title.toLowerCase().replace(/\s+/g, "-")}-header`}
        >
          {Icon && <Icon className="h-5 w-5" aria-hidden="true" role="img" />}
          <span>{title}</span>
        </h2>
        {description && (
          <Typography
            className="text-sm text-muted-foreground mt-1"
            aria-describedby={`${title
              .toLowerCase()
              .replace(/\s+/g, "-")}-header`}
          >
            {description}
          </Typography>
        )}
      </header>
    );
  }
);

MainContentHeader.displayName = "MainContentHeader";

export default MainContentHeader;
