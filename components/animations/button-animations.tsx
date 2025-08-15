"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ReactNode } from "react";
import { HoverScale, springTransition } from "./index";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
  scale?: number;
}

export const AnimatedButton = ({
  children,
  onClick,
  type = "button",
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  scale = 1.05,
  ...ariaProps
}: AnimatedButtonProps) => (
  <HoverScale scale={scale}>
    <Button
      type={type}
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...ariaProps}
    >
      {children}
    </Button>
  </HoverScale>
);

interface AnimatedSubmitButtonProps {
  children: ReactNode;
  disabled?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const AnimatedSubmitButton = ({
  children,
  disabled = false,
  size = "sm",
  className = ""
}: AnimatedSubmitButtonProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={springTransition}
  >
    <Button 
      type="submit" 
      size={size}
      className={className}
      disabled={disabled}
    >
      {children}
    </Button>
  </motion.div>
);

interface AnimatedCancelButtonProps {
  children: ReactNode;
  onClick: () => void;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const AnimatedCancelButton = ({
  children,
  onClick,
  size = "sm",
  className = ""
}: AnimatedCancelButtonProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={springTransition}
  >
    <Button
      type="button"
      variant="outline"
      size={size}
      className={className}
      onClick={onClick}
    >
      {children}
    </Button>
  </motion.div>
);

interface AnimatedSecondaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  "aria-label"?: string;
}

export const AnimatedSecondaryButton = ({
  children,
  onClick,
  size = "sm",
  className = "",
  ...ariaProps
}: AnimatedSecondaryButtonProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={springTransition}
  >
    <Button
      size={size}
      type="button"
      variant="secondary"
      className={className}
      onClick={onClick}
      {...ariaProps}
    >
      {children}
    </Button>
  </motion.div>
);

interface AnimatedIconButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  "aria-label": string;
  tabIndex?: number;
}

export const AnimatedIconButton = ({
  children,
  onClick,
  variant = "ghost",
  className = "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
  tabIndex = 0,
  ...ariaProps
}: AnimatedIconButtonProps) => (
  <Button
    type="button"
    variant={variant}
    size="icon"
    className={className}
    onClick={onClick}
    tabIndex={tabIndex}
    {...ariaProps}
  >
    {children}
  </Button>
);
