import React from "react";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
}

const Divider: React.FC<DividerProps> = ({
  className = "",
  style = {},
  ...props
}) => (
  <div
    className={`w-20 h-0.5 mx-auto mb-8 rounded-full bg-gradient-to-r from-primary via-chart-2 to-chart-3 shadow-lg animate-scale-in sm:w-28 md:w-32 md:mb-10 ${className}`.trim()}
    style={{
      boxShadow: "0 2px 16px 0 rgba(80,120,255,0.15)",
      filter: "drop-shadow(0 0 8px var(--primary))",
      animation: "scale-in 0.7s cubic-bezier(0.4,0,0.2,1)",
      ...style,
    }}
    aria-hidden="true"
    {...props}
  />
);

export default Divider;
