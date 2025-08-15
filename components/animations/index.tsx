"use client";

import { motion, AnimatePresence, Variants } from "motion/react";
import { ReactNode } from "react";

// Animation variants for consistency
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const fadeInScale: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95, y: -10 },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  initial: { scale: 0 },
  animate: { scale: 1 },
};

// Common transition configurations
export const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 17,
};

export const easeTransition = {
  duration: 0.4,
  ease: "easeOut" as const,
};

// Reusable Animation Components

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  "aria-labelledby"?: string;
}

export const AnimatedSection = ({
  children,
  delay = 0.2,
  className = "space-y-4",
  ...ariaProps
}: AnimatedSectionProps) => (
  <motion.section
    className={className}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    {...ariaProps}
  >
    {children}
  </motion.section>
);

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedCard = ({
  children,
  className = "rounded-lg border bg-card p-6 shadow-sm",
  delay = 0,
}: AnimatedCardProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0.95, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: -10 }}
    transition={{ duration: 0.3, delay }}
  >
    {children}
  </motion.div>
);

interface AnimatedListItemProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedListItem = ({
  children,
  className = "",
}: AnimatedListItemProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export const HoverScale = ({
  children,
  scale = 1.05,
  className = "",
}: HoverScaleProps) => (
  <motion.div
    className={className}
    whileHover={{ scale }}
    whileTap={{ scale: 0.95 }}
    transition={springTransition}
  >
    {children}
  </motion.div>
);

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: FadeInProps) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 20 };
      case "down":
        return { opacity: 0, y: -20 };
      case "left":
        return { opacity: 0, x: -20 };
      case "right":
        return { opacity: 0, x: 20 };
      default:
        return { opacity: 0, y: 20 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  className = "",
}: StaggerContainerProps) => (
  <motion.div
    className={className}
    initial="initial"
    animate="animate"
    variants={{
      initial: {},
      animate: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
  >
    {children}
  </motion.div>
);

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem = ({ children, className = "" }: StaggerItemProps) => (
  <motion.div
    className={className}
    variants={{
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    }}
  >
    {children}
  </motion.div>
);

interface AnimatedIconProps {
  children: ReactNode;
  animation?: "spin" | "bounce" | "pulse" | "scale";
  delay?: number;
  className?: string;
}

export const AnimatedIcon = ({
  children,
  animation = "scale",
  delay = 0,
  className = "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10",
}: AnimatedIconProps) => {
  const getAnimation = () => {
    switch (animation) {
      case "spin":
        return { rotate: [0, 360] };
      case "bounce":
        return { y: [0, -5, 0] };
      case "pulse":
        return { scale: [1, 1.1, 1] };
      case "scale":
        return { scale: [0, 1] };
      default:
        return { scale: [0, 1] };
    }
  };

  return (
    <motion.div
      className={className}
      initial={{ scale: 0 }}
      animate={getAnimation()}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay,
        ...(animation === "spin" && { duration: 0.5 }),
        ...(animation === "bounce" && { repeat: Infinity, duration: 2 }),
        ...(animation === "pulse" && { repeat: Infinity, duration: 2 }),
      }}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedFormActionsProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedFormActions = ({
  children,
  delay = 0.4,
  className = "flex gap-3 pt-2",
}: AnimatedFormActionsProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
  >
    {children}
  </motion.div>
);

interface AnimatedPresenceWrapperProps {
  children: ReactNode;
  mode?: "wait" | "sync" | "popLayout";
}

export const AnimatedPresenceWrapper = ({
  children,
  mode = "wait",
}: AnimatedPresenceWrapperProps) => (
  <AnimatePresence mode={mode}>{children}</AnimatePresence>
);

// Header animation component
interface AnimatedHeaderProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedHeader = ({
  children,
  delay = 0.1,
  className = "mb-6 flex items-center gap-3",
}: AnimatedHeaderProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay }}
  >
    {children}
  </motion.div>
);
