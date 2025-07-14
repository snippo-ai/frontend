/* Improved SignUpForm with enhanced animations, visual delight, and better UX */

"use client";

import { PreviousStateType, signUp } from "@/actions/user";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Lock, Mail, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export const initialState: PreviousStateType = {
  success: false,
  error: null,
  values: {},
};

const SignUpForm = ({ className = "", ...props }) => {
  const router = useRouter();
  const [state, formAction] = useActionState(signUp, initialState);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
    if (state?.error) toast.error(state.error);
    else if (state?.success) {
      // Check onboarding status
      fetch("http://localhost:8080/api/user/onboarding")
        .then((res) => res.json())
        .then((data) => {
          if (data.onboardingComplete) {
            toast.success("Account created!");
            router.push("/platform");
          } else {
            toast.success("Account created!");
            router.push("/onboarding");
          }
        })
        .catch(() => {
          toast.error("Could not check onboarding status");
          router.push("/platform");
        });
    }
  }, [state, router]);

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-3">
          <Sparkles className="size-6 text-foreground mr-2" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Join Snippo AI
          </h1>
        </div>
        <p className="text-muted-foreground text-fluid-sm text-pretty">
          Start your journey with the future of AI-powered development
        </p>
      </div>

      <form action={formAction} autoComplete="off" className="space-y-6">
        {/* Name fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-foreground"
            >
              First name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                defaultValue={state?.values?.firstName ?? ""}
                className="pl-10 h-12 bg-card/30 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-foreground"
            >
              Last name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                defaultValue={state?.values?.lastName ?? ""}
                className="pl-10 h-12 bg-card/30 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Email field */}
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
              placeholder="john@example.com"
              defaultValue={state?.values?.email ?? ""}
              className="pl-10 h-12 bg-card/30 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Password field */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              className="pl-10 h-12 bg-card/30 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium transition-all duration-300 group"
          onClick={() => setLoading(true)}
        >
          {loading ? (
            <Spinner className="size-5" />
          ) : (
            <>
              Create account
              <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>

        {/* Login link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-chart-2 hover:text-chart-3 font-medium underline-offset-4 hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>

      {/* Terms and privacy */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground leading-relaxed text-balance">
          By creating an account, you agree to our{" "}
          <Link
            href="/terms"
            className="text-chart-2 hover:text-chart-3 underline underline-offset-4 transition-colors"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="text-chart-2 hover:text-chart-3 underline underline-offset-4 transition-colors"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
