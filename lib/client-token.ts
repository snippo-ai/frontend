"use client";

let cachedToken: string | null = null;
let lastFetchTime = 0;

export const getClientToken = async (): Promise<string | null> => {
  if (typeof window === "undefined") return null; // SSR safety
  const now = Date.now();

  if (cachedToken && now - lastFetchTime < 10000) return cachedToken;

  try {
    const session = await import("next-auth/react").then((mod) =>
      mod.getSession()
    );
    const token = session?.token || null;
    if (token) {
      cachedToken = token;
      lastFetchTime = now;
    }
    return token;
  } catch (err) {
    console.error("Error fetching client token", err);
    return null;
  }
};

export const clearClientToken = () => {
  cachedToken = null;
};
