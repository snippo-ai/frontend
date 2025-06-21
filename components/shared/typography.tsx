import clsx from "clsx";
import { ElementType, HTMLAttributes } from "react";

type FluidSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

const fluidSizeMap = {
  xs: "text-fluid-xs",
  sm: "text-fluid-sm",
  base: "text-fluid-base",
  lg: "text-fluid-lg",
  xl: "text-fluid-xl",
  "2xl": "text-fluid-2xl",
  "3xl": "text-fluid-3xl",
  "4xl": "text-fluid-4xl",
  "5xl": "text-fluid-5xl",
};

type TypographyProps<T extends ElementType = "p"> = {
  as?: T;
  children: React.ReactNode;
  fluidSize?: FluidSize;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "as">;

const Typography = <T extends ElementType = "p">({
  as,
  children,
  fluidSize,
  className,
  ...props
}: TypographyProps<T>) => {
  const Component = as || "p";

  return (
    <Component
      className={clsx(
        "text-foreground",
        className,
        fluidSize && fluidSizeMap[fluidSize]
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
