"use client";

import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Reset failed");

      toast.success(data?.message || "Password reset successfully!");
      router.push("/login");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-2">
          Set a new password
        </h1>
        <p className="text-muted-foreground text-fluid-sm">
          Enter and confirm your new password below
        </p>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
        {/* New Password */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            New Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              className="pl-10 h-12 bg-card/30 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label
            htmlFor="confirm"
            className="text-sm font-medium text-foreground"
          >
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="confirm"
              type="password"
              placeholder="Confirm new password"
              className="pl-10 h-12 bg-card/30 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium transition-all duration-300 group"
        >
          {loading ? <Spinner className="size-5" /> : <>Reset Password</>}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
