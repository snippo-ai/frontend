"use client";

import { useConfirmDialog } from "@/lib/providers/confirm-dialog-provider";
import { signOut } from "next-auth/react";
import { AUTH_ROUTES } from "@/routes";

export function useLogoutWithConfirm() {
  const confirm = useConfirmDialog();

  const handleLogout = async () => {
    const confirmed = await confirm({
      title: "Confirm Logout",
      description:
        "You will be signed out and need to log in again to access your account.",
      confirmText: "Log out",
      cancelText: "Cancel",
      danger: true,
    });

    if (confirmed) {
      await signOut({ callbackUrl: AUTH_ROUTES.LOGIN });
    }
  };

  return handleLogout;
}
