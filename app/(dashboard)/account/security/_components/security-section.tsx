"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  SectionIconMap,
  SECTIONS_ENUM,
} from "@/lib/mocks/account-settings-sidebar-data";
import { Eye, EyeOff, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Fragment, useState } from "react";
import LineItem from "../../_components/line-item";
import MainContentHeader from "../../_components/main-content-header";

const SecuritySection = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordFormChange = (field: string, value: string) => {
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
    announcement.textContent = "Password update form submitted. Processing your request.";
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
    <Fragment>
      <motion.section
        aria-labelledby="security-section-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 id="security-section-heading" className="sr-only">
          Security Settings
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <MainContentHeader
            title="Security Settings"
            description="Manage your password, two-factor authentication, and security preferences."
            icon={SectionIconMap[SECTIONS_ENUM.SECURITY]}
          />
        </motion.div>

        <Separator className="my-4 mb-6" />

        <div className="grid gap-8">
          {/* Password Section */}
          <motion.section
            aria-labelledby="password-section-heading"
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h3 id="password-section-heading" className="sr-only">
              Password Management
            </h3>

            <AnimatePresence mode="wait">
              {!isChangingPassword ? (
                <motion.div
                  key="password-line-item"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <LineItem
                    label="Password"
                    subLabel="Last updated 30 days ago"
                    action={
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Button
                          size="sm"
                          type="button"
                          variant="secondary"
                          onClick={() => setIsChangingPassword(true)}
                          aria-label="Change your password"
                        >
                          Change Password
                        </Button>
                      </motion.div>
                    }
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="password-form"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-6 rounded-lg border p-6"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Shield className="h-5 w-5 text-primary" />
                    </motion.div>
                    <h4 className="text-lg font-semibold">Update Password</h4>
                  </motion.div>

                  <motion.form
                    onSubmit={handlePasswordSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    role="form"
                    aria-labelledby="password-form-title"
                    aria-describedby="password-form-description"
                    noValidate
                  >
                    <div id="password-form-description" className="sr-only">
                      Complete this form to update your account password. All fields are required for security verification.
                    </div>
                    
                    {/* Current Password */}
                    <div className="space-y-2">
                      <Label htmlFor="current-password" className="text-sm font-medium">
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
                          Enter your existing password to verify your identity before setting a new password
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          aria-label={
                            showCurrentPassword
                              ? "Hide current password text"
                              : "Show current password text"
                          }
                          tabIndex={0}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <Eye className="h-4 w-4" aria-hidden="true" />
                          )}
                        </Button>
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
                            handlePasswordFormChange(
                              "newPassword",
                              e.target.value
                            )
                          }
                          placeholder="Enter your new password"
                          className="pr-10"
                          required
                          aria-describedby="new-password-help"
                          aria-required="true"
                          autoComplete="new-password"
                        />
                        <div id="new-password-help" className="text-xs text-muted-foreground mt-1">
                          Must be at least 8 characters with uppercase, lowercase, numbers, and special characters
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          aria-label={
                            showNewPassword
                              ? "Hide new password text"
                              : "Show new password text"
                          }
                          tabIndex={0}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <Eye className="h-4 w-4" aria-hidden="true" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-sm font-medium">
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
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirm password text"
                              : "Show confirm password text"
                          }
                          tabIndex={0}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <Eye className="h-4 w-4" aria-hidden="true" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <motion.div 
                      className="flex gap-3 pt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Button type="submit" size="sm">
                          Update Password
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={resetPasswordForm}
                        >
                          Cancel
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Two-Factor Authentication Section */}
          <motion.section 
            aria-labelledby="2fa-section-heading" 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h3 id="2fa-section-heading" className="sr-only">
              Two-Factor Authentication
            </h3>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <LineItem
                label="Two-Factor Authentication"
                subLabel="Add an extra layer of security to your account"
                action={
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      size="sm"
                      type="button"
                      variant="secondary"
                      aria-label="Enable two-factor authentication"
                    >
                      Enable 2FA
                    </Button>
                  </motion.div>
                }
              />
            </motion.div>
          </motion.section>

          {/* Login Sessions Section */}
          <motion.section
            aria-labelledby="sessions-section-heading"
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h3 id="sessions-section-heading" className="sr-only">
              Active Sessions
            </h3>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <LineItem
                label="Active Sessions"
                subLabel="Manage devices and browsers where you're signed in"
                action={
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      size="sm"
                      type="button"
                      variant="secondary"
                      aria-label="Manage active sessions"
                    >
                      Manage Sessions
                    </Button>
                  </motion.div>
                }
              />
            </motion.div>
          </motion.section>
        </div>
      </motion.section>
    </Fragment>
  );
};

export default SecuritySection;
