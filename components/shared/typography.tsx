import { cn } from "@/lib/utils";
import { ElementType, HTMLAttributes } from "react";

type FluidSize =
  | "fluid-xs"
  | "fluid-sm"
  | "fluid-base"
  | "fluid-lg"
  | "fluid-xl"
  | "fluid-2xl"
  | "fluid-3xl"
  | "fluid-4xl"
  | "fluid-5xl";

type TypographyProps<T extends ElementType = "p"> = {
  as?: T;
  children: React.ReactNode;
  fluidSize?: FluidSize;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "as">;

const Typography = <T extends ElementType = "p">({
  as,
  children,
  fluidSize = "fluid-base",
  className,
  ...props
}: TypographyProps<T>) => {
  const Component = as || "p";

  return (
    <Component
      className={cn("text-foreground", fluidSize, className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
