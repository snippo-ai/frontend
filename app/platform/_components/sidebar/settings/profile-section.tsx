"use client";

import Typography from "@/components/shared/typography";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Textarea } from "@/components/ui/textarea";
import { fetcher } from "@/lib/api";
import { SectionIconMap, SECTIONS_ENUM } from "@/lib/mocks/settings";
import { maskEmail } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRightIcon,
  ImageIcon,
  InfoIcon,
  UserCircle,
  X as XIcon,
} from "lucide-react";
import { Session } from "next-auth";
import { useCallback, useEffect, useRef, useState } from "react";
import MainContentHeader from "./main-content-header";

type Props = {
  session: Session;
};

const ProfileSection = ({ session }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const otpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showOtp && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [showOtp]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const resetDialogState = useCallback(() => {
    setShowOtp(false);
    setOtp("");
    setError(null);
    setSuccess(null);
    setResendCooldown(0);
  }, []);

  const handleModalChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) resetDialogState();
    },
    [resetDialogState]
  );

  const sendVerificationRequest = useCallback(
    async (resend = false) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetcher({
          url: "/auth/request-verification",
          method: "POST",
          data: { email: session.user.email },
        });
        if (response.status > 302) {
          throw new Error(response?.data?.message);
        }

        setSuccess(
          `Verification email ${
            resend ? "resent" : "sent"
          }. Please check your inbox.`
        );
        setShowOtp(true);
        setResendCooldown(30);
      } catch (err: unknown) {
        const message =
          typeof err === "object" &&
          err !== null &&
          "message" in err &&
          typeof (err as unknown as { message?: unknown }).message === "string"
            ? (err as unknown as { message: string }).message
            : "Failed to send verification email.";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [session.user.email]
  );

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("Email verified successfully!");
    setTimeout(() => setOpen(false), 1500);
  };

  return (
    <>
      <MainContentHeader
        title="Profile"
        description="Manage your account settings and profile information."
        icon={SectionIconMap[SECTIONS_ENUM.PROFILE]}
      />

      <div className="grid gap-6">
        {/* User Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["firstName", "lastName"].map((key) => (
            <div key={key}>
              <Typography
                as="label"
                fluidSize="xs"
                className="block font-medium"
              >
                {key === "firstName" ? "First name" : "Last name"}
              </Typography>
              <Input
                id={key}
                name={key}
                autoComplete={
                  key === "firstName" ? "given-name" : "family-name"
                }
                className="mt-2"
                value={session.user[key as "firstName" | "lastName"]}
              />
            </div>
          ))}

          {/* Email Section */}
          <div className="md:col-span-2">
            <Typography as="label" fluidSize="xs" className="block font-medium">
              Email address
            </Typography>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="mt-2 font-mono"
              value={maskEmail(session.user.email)}
              disabled
            />
            {!session.user.isEmailVerified && (
              <div
                role="alert"
                aria-live="polite"
                className="flex items-center gap-1.5 mt-2"
              >
                <InfoIcon className="size-4 text-amber-600" aria-hidden />
                <Typography
                  as="p"
                  fluidSize="xs"
                  className="text-amber-600 font-medium"
                >
                  Email not verified.
                </Typography>

                <AlertDialog open={open} onOpenChange={handleModalChange}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="link"
                      className="text-xs px-0 text-muted-foreground hover:text-foreground group gap-1"
                    >
                      Verify Now{" "}
                      <ChevronRightIcon className="size-4 group-hover:translate-x-1 transition-200" />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                      aria-label="Close"
                    >
                      <XIcon className="w-5 h-5 text-muted-foreground" />
                      <span className="sr-only">Close</span>
                    </button>

                    {/* Step Indicators */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      {[!showOtp, showOtp].map((active, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full ${
                            active ? "bg-primary" : "bg-muted-foreground/40"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Step 1: Send Verification */}
                    {!showOtp && (
                      <div className="relative">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            <Typography
                              as="h3"
                              fluidSize="lg"
                              className="font-semibold"
                            >
                              Send Verification Email?
                            </Typography>
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            <Typography
                              as="p"
                              fluidSize="sm"
                              className="text-muted-foreground"
                            >
                              We’ll send a verification link to{" "}
                              <span className="font-semibold text-foreground font-mono">
                                {maskEmail(session.user.email)}
                              </span>
                              .
                            </Typography>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        {error && (
                          <Typography
                            as="p"
                            fluidSize="xs"
                            className="text-destructive mt-2"
                          >
                            {error}
                          </Typography>
                        )}
                        {success && (
                          <Typography
                            as="p"
                            fluidSize="xs"
                            className="text-green-600 mt-2"
                          >
                            {success}
                          </Typography>
                        )}

                        <AlertDialogFooter className="mt-6">
                          <AlertDialogCancel disabled={loading}>
                            Cancel
                          </AlertDialogCancel>
                          <Button
                            type="button"
                            onClick={() => sendVerificationRequest(false)}
                            disabled={loading}
                          >
                            {loading ? "Sending..." : "Send Email"}
                          </Button>
                        </AlertDialogFooter>
                      </div>
                    )}

                    {/* Step 2: OTP Form */}
                    <AnimatePresence>
                      {showOtp && (
                        <motion.form
                          key="otp"
                          onSubmit={handleOtpSubmit}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 30 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="flex flex-col items-center gap-4 py-4"
                        >
                          <Typography
                            as="h3"
                            fluidSize="lg"
                            className="font-semibold"
                          >
                            Enter OTP
                          </Typography>
                          <Typography
                            as="p"
                            fluidSize="sm"
                            className="text-muted-foreground"
                          >
                            Please enter the 6-digit code sent to{" "}
                            <span className="font-semibold text-foreground">
                              {session.user.email}
                            </span>
                            .
                          </Typography>

                          <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={setOtp}
                            containerClassName="justify-center"
                            inputMode="numeric"
                            ref={otpInputRef}
                          >
                            <InputOTPGroup>
                              {Array.from({ length: 6 }).map((_, i) => (
                                <InputOTPSlot key={i} index={i} />
                              ))}
                            </InputOTPGroup>
                          </InputOTP>

                          {error && (
                            <Typography
                              as="p"
                              fluidSize="xs"
                              className="text-destructive"
                            >
                              {error}
                            </Typography>
                          )}
                          {success && (
                            <Typography
                              as="p"
                              fluidSize="xs"
                              className="text-green-600"
                            >
                              {success}
                            </Typography>
                          )}

                          <Button
                            type="submit"
                            disabled={otp.length !== 6 || loading}
                            className="w-full"
                          >
                            {loading ? "Verifying..." : "Verify Email"}
                          </Button>

                          <div className="flex items-center gap-2 mt-2">
                            <Typography
                              as="span"
                              fluidSize="xs"
                              className="text-muted-foreground"
                            >
                              Didn’t get the code?
                            </Typography>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="px-2 py-0 h-auto text-xs"
                              onClick={() => sendVerificationRequest(true)}
                              disabled={resendCooldown > 0 || loading}
                            >
                              Resend
                              {resendCooldown > 0
                                ? ` (${resendCooldown}s)`
                                : ""}
                            </Button>
                          </div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </div>

        {/* About */}
        <div>
          <Typography as="label" fluidSize="xs" className="block font-medium">
            About
          </Typography>
          <Textarea
            id="about"
            name="about"
            rows={3}
            placeholder="Write a few sentences about yourself."
            className="mt-2"
          />
        </div>

        {/* Avatar + Cover */}
        <div className="flex items-center gap-4">
          <UserCircle aria-hidden className="size-12 text-muted-foreground" />
          <Button type="button" variant="secondary">
            Change
          </Button>
        </div>

        <div>
          <Typography as="label" fluidSize="xs" className="block font-medium">
            Cover photo
          </Typography>
          <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6">
            <ImageIcon
              aria-hidden
              className="size-12 text-muted-foreground mb-2"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-primary font-semibold"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
              />
            </label>
            <Typography
              as="p"
              fluidSize="xs"
              className="text-muted-foreground mt-2"
            >
              PNG, JPG, GIF up to 10MB
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
