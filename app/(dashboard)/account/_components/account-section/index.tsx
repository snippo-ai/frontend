"use client";

import { Separator } from "@/components/ui/separator";
import {
  SectionIconMap,
  SECTIONS_ENUM,
} from "@/lib/mocks/account-settings-sidebar-data";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import MainContentHeader from "../main-content-header";
import SystemSettings from "./system-settings";
import UserAvatar from "./user-avatar";
import UserDetails from "./user-details";

type Props = {
  session: Session;
};

const AccountSection = ({ session }: Props) => {
  // const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [showOtp, setShowOtp] = useState(false);
  // const [otp, setOtp] = useState("");
  // const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // const otpInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (showOtp && otpInputRef.current) {
  //     otpInputRef.current.focus();
  //   }
  // }, [showOtp]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // const resetDialogState = useCallback(() => {
  //   setShowOtp(false);
  //   setOtp("");
  //   setError(null);
  //   setSuccess(null);
  //   setResendCooldown(0);
  // }, []);

  // const handleModalChange = useCallback(
  //   (isOpen: boolean) => {
  //     setOpen(isOpen);
  //     if (!isOpen) resetDialogState();
  //   },
  //   [resetDialogState]
  // );

  // const sendVerificationRequest = useCallback(
  //   async (resend = false) => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await fetcher({
  //         url: "/auth/request-verification",
  //         method: "POST",
  //         data: { email: session.user.email },
  //       });
  //       if (response.status > 302) {
  //         throw new Error(response?.data?.message);
  //       }

  //       setSuccess(
  //         `Verification email ${
  //           resend ? "resent" : "sent"
  //         }. Please check your inbox.`
  //       );
  //       setShowOtp(true);
  //       setResendCooldown(30);
  //     } catch (err: unknown) {
  //       const message =
  //         typeof err === "object" &&
  //         err !== null &&
  //         "message" in err &&
  //         typeof (err as unknown as { message?: unknown }).message === "string"
  //           ? (err as unknown as { message: string }).message
  //           : "Failed to send verification email.";
  //       setError(message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [session.user.email]
  // );

  // const handleOtpSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setSuccess("Email verified successfully!");
  //   setTimeout(() => setOpen(false), 1500);
  // };

  // useEffect(() => {
  //   if (showOtp && otp.length === 6) {
  //     const event = { preventDefault: () => {} } as React.FormEvent;
  //     handleOtpSubmit(event);
  //   }
  // }, [otp, showOtp]);

  return (
    <section aria-labelledby="account-section-heading">
      <h2 id="account-section-heading" className="sr-only">
        Account Settings
      </h2>

      <MainContentHeader
        title="Account"
        description="Manage your account information, email preferences, and account status."
        icon={SectionIconMap[SECTIONS_ENUM.ACCOUNT]}
      />
      <Separator className="my-4 mb-6" />
      <div className="grid gap-8">
        <UserAvatar user={session.user} />
        <UserDetails user={session.user} />
      </div>

      <SystemSettings userEmail={session.user.email} />
    </section>
  );
};

export default AccountSection;
