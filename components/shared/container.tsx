import { cn } from "@/lib/utils";
import * as React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The maximum width of the container
   * @default "7xl"
   */
  maxWidth?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "full"
    | "none";
  /**
   * Whether to center the container horizontally
   * @default true
   */
  center?: boolean;
  /**
   * Horizontal padding size
   * @default "default"
   */
  padding?: "none" | "sm" | "default" | "lg" | "xl" | "2xl";
  /**
   * Whether to apply responsive padding that adjusts based on screen size
   * @default true
   */
  responsivePadding?: boolean;
  /**
   * Whether to apply a subtle background color
   * @default false
   */
  background?: boolean;
  /**
   * Whether to apply rounded corners
   * @default false
   */
  rounded?: boolean;
  /**
   * Whether to apply a border
   * @default false
   */
  border?: boolean;
  /**
   * Whether to apply a shadow
   * @default false
   */
  shadow?: boolean;
  /**
   * Custom max width value (overrides maxWidth prop)
   */
  customMaxWidth?: string;
  /**
   * Whether to apply focus styles for keyboard navigation
   * @default false
   */
  focusable?: boolean;
  /**
   * ARIA role for accessibility
   */
  role?: string;
  /**
   * ARIA label for screen readers
   */
  "aria-label"?: string;
  /**
   * ARIA describedby for screen readers
   */
  "aria-describedby"?: string;
}

const maxWidthClasses = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
  none: "",
} as const;

const paddingClasses = {
  none: "",
  sm: "px-2 sm:px-4",
  default: "px-4 sm:px-6 lg:px-8",
  lg: "px-6 sm:px-8 lg:px-12",
  xl: "px-8 sm:px-12 lg:px-16",
  "2xl": "px-12 sm:px-16 lg:px-24",
} as const;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      maxWidth = "7xl",
      center = true,
      padding = "default",
      responsivePadding = true,
      background = false,
      rounded = false,
      border = false,
      shadow = false,
      customMaxWidth,
      focusable = false,
      role,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      children,
      ...props
    },
    ref
  ) => {
    const containerClasses = cn(
      // Base classes
      "w-full",

      // Max width
      customMaxWidth ? "" : maxWidthClasses[maxWidth],

      // Centering
      center && "mx-auto",

      // Padding
      responsivePadding
        ? paddingClasses[padding]
        : paddingClasses[padding].split(" ")[0],

      // Background
      background && "bg-background dark:bg-gray-900",

      // Rounded corners
      rounded && "rounded-lg",

      // Border
      border && "border border-border dark:border-gray-700",

      // Shadow
      shadow && "shadow-lg dark:shadow-gray-900/20",

      // Focus styles for keyboard navigation
      focusable &&
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900",

      // Custom max width
      customMaxWidth && `max-w-[${customMaxWidth}]`,

      className
    );

    return (
      <div
        ref={ref}
        className={containerClasses}
        role={role}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export { Container };
