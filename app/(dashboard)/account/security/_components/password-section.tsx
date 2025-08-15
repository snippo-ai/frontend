"use client";

import {
  AnimatedCard,
  AnimatedFormActions,
  AnimatedHeader,
  AnimatedIcon,
  AnimatedListItem,
  AnimatedPresenceWrapper,
  AnimatedSection,
} from "@/components/animations";
import {
  AnimatedCancelButton,
  AnimatedIconButton,
  AnimatedSecondaryButton,
  AnimatedSubmitButton,
} from "@/components/animations/button-animations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import LineItem from "../../../_components/line-item";

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordSection = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordFormChange = (
    field: keyof PasswordFormData,
    value: string
  ) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password update functionality
    console.log("Password update submitted:", passwordForm);

    // Announce success to screen readers
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "assertive");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent =
      "Password update form submitted. Processing your request.";
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const resetPasswordForm = () => {
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsChangingPassword(false);
  };

  return (
    <AnimatedSection aria-labelledby="password-section-heading" delay={0.2}>
      <h3 id="password-section-heading" className="sr-only">
        Password Management
      </h3>

      <AnimatedPresenceWrapper>
        {!isChangingPassword ? (
          <AnimatedListItem key="password-line-item">
            <LineItem
              label="Password"
              subLabel="Last updated 30 days ago"
              action={
                <AnimatedSecondaryButton
                  onClick={() => setIsChangingPassword(true)}
                  aria-label="Change password"
                >
                  Change Password
                </AnimatedSecondaryButton>
              }
            />
          </AnimatedListItem>
        ) : (
          <AnimatedCard key="password-form">
            <AnimatedHeader delay={0.1}>
              <AnimatedIcon animation="scale" delay={0.2}>
                <Shield className="h-5 w-5 text-primary" />
              </AnimatedIcon>
              <h4 className="text-lg font-semibold">Update Password</h4>
            </AnimatedHeader>

            <motion.form
              onSubmit={handlePasswordSubmit}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              role="form"
              aria-labelledby="password-form-title"
              aria-describedby="password-form-description"
              noValidate
            >
              <div id="password-form-description" className="sr-only">
                Complete this form to update your account password. All fields
                are required for security verification.
              </div>

              {/* Current Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="current-password"
                  className="text-sm font-medium"
                >
                  Current Password *
                </Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      handlePasswordFormChange(
                        "currentPassword",
                        e.target.value
                      )
                    }
                    placeholder="Enter your current password"
                    className="pr-10"
                    required
                    aria-describedby="current-password-help"
                    aria-required="true"
                    autoComplete="current-password"
                  />
                  <div id="current-password-help" className="sr-only">
                    Enter your existing password to verify your identity before
                    setting a new password
                  </div>
                  <AnimatedIconButton
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    aria-label={
                      showCurrentPassword
                        ? "Hide current password text"
                        : "Show current password text"
                    }
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </AnimatedIconButton>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-sm font-medium">
                  New Password *
                </Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      handlePasswordFormChange("newPassword", e.target.value)
                    }
                    placeholder="Enter your new password"
                    className="pr-10"
                    required
                    aria-describedby="new-password-help"
                    aria-required="true"
                    autoComplete="new-password"
                  />
                  <div id="new-password-help" className="sr-only">
                    Choose a strong password with at least 8 characters,
                    including uppercase, lowercase, numbers, and special
                    characters
                  </div>
                  <AnimatedIconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    aria-label={
                      showNewPassword
                        ? "Hide new password text"
                        : "Show new password text"
                    }
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </AnimatedIconButton>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirm-password"
                  className="text-sm font-medium"
                >
                  Confirm New Password *
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      handlePasswordFormChange(
                        "confirmPassword",
                        e.target.value
                      )
                    }
                    placeholder="Confirm your new password"
                    className="pr-10"
                    required
                    aria-describedby="confirm-password-help"
                    aria-required="true"
                    autoComplete="new-password"
                  />
                  <div id="confirm-password-help" className="sr-only">
                    Re-enter your new password to confirm it matches
                  </div>
                  <AnimatedIconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password text"
                        : "Show confirm password text"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </AnimatedIconButton>
                </div>
              </div>

              {/* Form Actions */}
              <AnimatedFormActions>
                <AnimatedSubmitButton>Update Password</AnimatedSubmitButton>
                <AnimatedCancelButton onClick={resetPasswordForm}>
                  Cancel
                </AnimatedCancelButton>
              </AnimatedFormActions>
            </motion.form>
          </AnimatedCard>
        )}
      </AnimatedPresenceWrapper>
    </AnimatedSection>
  );
};

export default PasswordSection;
