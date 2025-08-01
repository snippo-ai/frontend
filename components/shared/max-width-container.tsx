import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type MaxWidthContainerProps = {
  children: ReactNode;
  maxWidth?: "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
};

const maxWidthOptions = {
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

const MaxWidthContainer = ({
  children,
  maxWidth = "4xl",
}: MaxWidthContainerProps) => {
  return (
    <div className={cn("container mx-auto", maxWidthOptions[maxWidth])}>
      {children}
    </div>
  );
};

export default MaxWidthContainer;
