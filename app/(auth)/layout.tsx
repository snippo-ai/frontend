import Logo from "@/components/shared/logo";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative min-h-svh bg-gradient-to-br from-background via-background to-muted overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs with enhanced animations */}
        {/* <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/15 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div> */}
        {/* <div
          className="absolute top-1/2 left-1/2 w-16 h-16 bg-primary/20 rounded-full blur-lg animate-float"
          style={{ animationDelay: "4s" }}
        ></div> */}

        {/* Additional floating elements */}
        {/* <div
          className="absolute top-1/6 right-1/6 w-8 h-8 bg-accent/20 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/6 w-12 h-12 bg-primary/15 rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        ></div> */}

        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center" style={{ animationDelay: "0.2s" }}>
            <Logo
              iconSize={32}
              textClassName="text-2xl font-bold text-primary"
              center
            />
            {/* <div className="mt-2 h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto animate-shimmer"></div> */}
          </div>

          <div className="relative">
            {/* Glass card background */}
            <div className="absolute inset-0 bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl"></div>

            {/* Content */}
            <div className="relative z-10 p-8">{children}</div>

            {/* Decorative elements */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary rounded-full animate-ping"></div>
            <div
              className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent rounded-full animate-ping"
              style={{ animationDelay: "0.7s" }}
            ></div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-accent/30 rounded-br-2xl"></div>
          </div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 via-transparent to-transparent"></div> */}

      {/* Top decorative wave */}
      {/* <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-accent/5 via-transparent to-transparent"></div> */}
    </div>
  );
};

export default AuthLayout;
