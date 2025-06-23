"use client";

import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:8080/auth/reset-password-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong");

      toast.success(data?.message || "Reset link sent! Check your inbox.");
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Failed to send reset email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-2">
          Reset your password
        </h1>
        <p className="text-muted-foreground text-fluid-sm">
          Enter your email address and we’ll send you a link to reset it.
        </p>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
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
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12 bg-card/30 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium transition-all duration-300 group"
        >
          {loading ? <Spinner className="size-5" /> : <>Send Reset Link</>}
        </Button>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
