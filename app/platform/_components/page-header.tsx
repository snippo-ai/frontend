import Typography from "@/components/shared/typography";
import React, { Fragment } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode[];
  ariaLabel?: string;
}

const PageHeader = ({
  title,
  description,
  actions,
  ariaLabel = "Page header",
}: PageHeaderProps) => {
  return (
    <header
      className="flex items-center justify-between"
      aria-label={ariaLabel}
    >
      <div>
        <Typography
          as="h1"
          fluidSize="2xl"
          className="font-bold tracking-tight"
        >
          {title}
        </Typography>
        <Typography as="p" className="text-muted-foreground" aria-live="polite">
          {description}
        </Typography>
      </div>
      {actions && actions.length > 0 && (
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Page actions"
        >
          {actions.map((action, idx) => (
            <Fragment key={idx}>{action}</Fragment>
          ))}
        </div>
      )}
    </header>
  );
};

export default PageHeader;
