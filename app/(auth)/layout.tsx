import Logo from "@/components/shared/logo";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Logo iconSize={32} textClassName="text-xl" center />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
