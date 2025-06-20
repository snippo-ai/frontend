/* Improved SignUpForm with enhanced animations, visual delight, and better UX */

"use client";

import { PreviousStateType, signUp } from "@/actions/user";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
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
      toast.success("Account created!");
      router.push("/login");
    }
  }, [state, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-fluid-xl">Welcome to Snippo AI</CardTitle>
          <CardDescription>
            Sign up with your GitHub or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} autoComplete="off">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <GithubIcon className="size-5" />
                  Github
                </Button>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Google
                </Button>
              </div>

              <div className="relative text-center text-fluid-xs text-muted-foreground">
                <span className="bg-card relative z-10 px-2">
                  Or sign up with email
                </span>
                <div className="absolute inset-0 top-1/2 border-t border-border z-0"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Let’s keep it casual"
                    defaultValue={state?.values?.firstName ?? ""}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="If you're feeling fancy"
                    defaultValue={state?.values?.lastName ?? ""}
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your inbox deserves good things"
                  defaultValue={state?.values?.email ?? ""}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Something secure, like prod creds"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                onClick={() => setLoading(true)}
              >
                {loading ? <Spinner /> : "Create Account"}
              </Button>

              <div className="text-center text-muted-foreground text-fluid-xs">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline hover:underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-fluid-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href="/terms-of-service">Terms of Service</Link> and{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </div>
    </div>
  );
};

export default SignUpForm;
