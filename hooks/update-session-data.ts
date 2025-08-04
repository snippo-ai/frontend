"use client";

import { useSession } from "next-auth/react";

type SessionUpdateFields = {
  isEmailVerified?: boolean;
  name?: string;
};

/**
 * Client-side hook to update the user's session data using next-auth's update method.
 *
 * Usage:
 *   const updateSession = useUpdateSession();
 *   updateSession({ isEmailVerified: true });
 *
 * @returns {(data: Record<string, any>) => Promise<void>}
 */
export function useUpdateSession() {
  const { update } = useSession();

  return async (fields: SessionUpdateFields): Promise<void> => {
    await update(fields);
  };
}
