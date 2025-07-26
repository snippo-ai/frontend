"use client";

import { login } from "@/actions/user";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { icons } from "@/lib/icons";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import SocialLogin from "./social-login";

type LoginFormProps = React.ComponentProps<"div"> & {
  redirectTo?: string;
};

const LoginForm: React.FC<LoginFormProps> = ({
  className = "",
  redirectTo = "/",
  ...props
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [state, formAction] = useActionState(login, null);

  useEffect(() => {
    setLoading(false);
    if (!state) return;

    if (state.error) {
      toast.error(state.error);
    } else if (state.success) {
      router.push(redirectTo);
    }
  }, [state, router, redirectTo]);

  return (
    <div className={className} {...props}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-2">
          Welcome back
        </h1>
        <p className="text-muted-foreground text-fluid-sm">
          Sign in to your account to continue your journey
        </p>
      </div>

      <form action={formAction} autoComplete="off" className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <SocialLogin Icon={icons.github} label="GitHub" />
          <SocialLogin Icon={icons.google} label="Google" />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/30"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="pl-10 h-12 bg-card/30 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              aria-required="true"
              aria-describedby="email-helper"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs text-chart-2 hover:text-chart-3 underline-offset-4 hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="pl-10 h-12 bg-card/30 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              aria-required="true"
              aria-describedby="password-helper"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium transition-all duration-300 group"
          onClick={() => setLoading(true)}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <Spinner className="size-5" />
          ) : (
            <>
              Sign in
              <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-chart-2 hover:text-chart-3 font-medium underline-offset-4 hover:underline transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
