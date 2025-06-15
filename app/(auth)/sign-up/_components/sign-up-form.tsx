/* Improved SignUpForm with enhanced animations, visual delight, and better UX */

"use client";

import { PreviousStateType, signUp } from "@/actions/user";
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
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const initialState: PreviousStateType = {
  success: false,
  error: null,
  values: {},
};

const SignUpForm = ({ className = "", ...props }) => {
  const router = useRouter();
  const [state, formAction] = useActionState(signUp, initialState);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    else if (state?.success) {
      toast.success("Account created! Redirecting...");
      router.push("/login");
    }
  }, [state, router]);

  return (
    <motion.div {...fadeInUp}>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="shadow-xl backdrop-blur-sm">
          <CardHeader className="text-center">
            <motion.div {...fadeInUp}>
              <CardTitle className="text-2xl font-mono">
                Welcome to Snippo AI
              </CardTitle>
              <CardDescription>
                Sign up with your GitHub or Google account
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <form action={formAction} autoComplete="off">
              <div className="grid gap-6">
                <motion.div
                  className="flex flex-col gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.15,
                      },
                    },
                  }}
                >
                  <motion.div variants={fadeInUp}>
                    <Button variant="outline" className="w-full">
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path d="M12.152 6.896..." fill="currentColor" />
                      </svg>
                      Continue with Apple
                    </Button>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <Button variant="outline" className="w-full">
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path d="M12.48 10.92..." fill="currentColor" />
                      </svg>
                      Continue with Google
                    </Button>
                  </motion.div>
                </motion.div>

                <div className="relative text-center text-sm">
                  <span className="bg-card relative z-10 px-2">
                    Or sign up with email
                  </span>
                  <div className="absolute inset-0 top-1/2 border-t border-border z-0"></div>
                </div>

                <motion.div
                  className="grid gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.15,
                      },
                    },
                  }}
                >
                  <motion.div
                    variants={fadeInUp}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
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
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your inbox deserves good things"
                      defaultValue={state?.values?.email ?? ""}
                      required
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp} className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Something secure, like prod creds"
                      required
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div variants={fadeInUp} className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Login
                  </Link>
                </motion.div>
              </div>
            </form>
          </CardContent>
        </Card>

        <motion.div
          variants={fadeInUp}
          className="text-muted-foreground text-center text-xs"
        >
          By signing up, you agree to our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignUpForm;
