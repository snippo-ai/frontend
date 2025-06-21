import { ElementType } from "react";
import type { FluidSize } from "./typography";
import Typography from "./typography";

interface SectionHeadingProps {
  as?: ElementType;
  children: React.ReactNode;
  subtitle?: React.ReactNode;
  fluidSize?: FluidSize;
  className?: string;
  subtitleClassName?: string;
}

const SectionHeading = ({
  as = "h2",
  children,
  subtitle,
  fluidSize = "2xl",
  className = "",
  subtitleClassName = "",
  ...props
}: SectionHeadingProps &
  Omit<
    React.ComponentPropsWithoutRef<ElementType>,
    keyof SectionHeadingProps
  >) => {
  return (
    <div className="flex flex-col items-center w-full mb-8">
      <Typography
        as={as}
        fluidSize={fluidSize}
        className={`font-bold tracking-tight text-center text-balance bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm ${className}`.trim()}
        {...props}
      >
        {children}
      </Typography>
      {subtitle && (
        <Typography
          as="p"
          fluidSize="lg"
          className={`mt-3 text-muted-foreground text-center max-w-2xl text-balance ${subtitleClassName}`.trim()}
        >
          {subtitle}
        </Typography>
      )}
    </div>
  );
};

export default SectionHeading;
