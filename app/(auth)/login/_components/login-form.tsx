"use client";

import { login } from "@/actions/auth";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { icons } from "@/lib/icons";
import { REDIRECT_ROUTES } from "@/routes";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
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
  const [state, formAction, isPending] = useActionState(login, null);

  const [isGoogleSignInPending, startGoogleTransition] = useTransition();

  const handleOAuthClick = async (name: string) => {
    if (name === "google") {
      startGoogleTransition(() =>
        signIn(name, {
          callbackUrl: REDIRECT_ROUTES.AFTER_LOGIN,
        })
      );
    }
  };

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    else if (state?.success) {
      router.push(redirectTo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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
          {/* <SocialLogin
            Icon={icons.github}
            label="GitHub"
            onClick={() => handleOAuthClick("github")}
          /> */}
          <SocialLogin
            Icon={icons.google}
            label="Google"
            onClick={() => handleOAuthClick("google")}
            loading={isGoogleSignInPending}
          />
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
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? (
            <Spinner className="size-5" />
          ) : (
            <>
              Login
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?
            <br />
            <Link
              href="/sign-up"
              className="text-chart-2 hover:text-chart-3 font-medium underline-offset-4 underline transition-colors"
            >
              Create One
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
