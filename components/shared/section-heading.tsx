import { ElementType } from "react";
import Typography from "./typography";

interface SectionHeadingProps {
  as?: ElementType;
  children: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  subtitleClassName?: string;
}

const SectionHeading = ({
  as = "h2",
  children,
  subtitle,
  className = "",
  subtitleClassName = "",
  ...props
}: SectionHeadingProps &
  Omit<
    React.ComponentPropsWithoutRef<ElementType>,
    keyof SectionHeadingProps
  >) => {
  return (
    <div className="flex flex-col items-center w-full mb-6 md:mb-8 lg:mb-10">
      <Typography
        as={as}
        fluidSize={"3xl"}
        className={`font-bold tracking-tight text-center text-balance bg-gradient-to-br from-chart-2 to-chart-4 bg-clip-text text-transparent drop-shadow-sm ${className}`.trim()}
        {...props}
      >
        {children}
      </Typography>
      {subtitle && (
        <Typography
          as="p"
          fluidSize="base"
          className={`mt-2 text-muted-foreground text-center max-w-4xl text-balance ${subtitleClassName}`.trim()}
        >
          {subtitle}
        </Typography>
      )}
    </div>
  );
};

export default SectionHeading;
