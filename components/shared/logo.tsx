"use client";

import { cn } from "@/lib/utils";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { forwardRef } from "react";

export interface LogoProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  iconSize?: number;
  label?: string;
  hideLabel?: boolean;
  iconClassName?: string;
  textClassName?: string;
  center?: boolean;
}

export const Logo = forwardRef<HTMLAnchorElement, LogoProps>(
  (
    {
      href = "/",
      className,
      iconSize = 24,
      label = "Snippo AI",
      hideLabel = false,
      iconClassName,
      textClassName,
      center = false,
      ...props
    },
    ref
  ) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          "flex items-center gap-2 font-medium",
          center && "justify-center mx-auto",
          className
        )}
        aria-label={label}
        {...props}
      >
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-md overflow-hidden",
            iconClassName
          )}
          style={{ width: iconSize, height: iconSize }}
          aria-hidden="true"
        >
          <Image
            src="https://ik.imagekit.io/snippoai/web/logos/snippo_logo.png?updatedAt=1744224540925"
            alt="Snippo AI Logo"
            width={iconSize}
            height={iconSize}
            priority
          />
        </span>
        {!hideLabel && (
          <span className={clsx("sr-only sm:not-sr-only", textClassName)}>
            {label}
          </span>
        )}
      </Link>
    );
  }
);

Logo.displayName = "Logo";

export default Logo;
